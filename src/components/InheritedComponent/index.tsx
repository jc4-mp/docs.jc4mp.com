import React from 'react';
import Heading from '@theme/Heading';
import { classDocs, ClassName } from '../../data/classDocs';

/**
 * Displays all inherited methods for a given class, grouped by ancestor class.
 * Usage: <InheritedComponent className="NetPlayer" />
 */
export const InheritedComponent: React.FC<{ className: ClassName }> = ({ className }) => {
  // Recursively collect inherited methods
  function getInheritanceChain(name: ClassName): { name: ClassName; methods: typeof classDocs[ClassName]['methods']; docLink: string }[] {
    const chain: { name: ClassName; methods: typeof classDocs[ClassName]['methods']; docLink: string }[] = [];
    let current: ClassName | undefined = name;
    while (current) {
      const doc = classDocs[current];
      if (doc) {
        chain.unshift({ name: doc.name, methods: doc.methods, docLink: doc.docLink });
        current = doc.parent;
      } else {
        break;
      }
    }
    return chain;
  }

  // Utility to create kebab-case anchor ids
  function toKebabCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
  }

  const chain = getInheritanceChain(className);
  // Remove the last item (the class itself), only show inherited, and only those with methods
  const inherited = chain.slice(0, -1).filter((ancestor) => ancestor.methods.length > 0);
  const base = chain[chain.length - 1];

  // If there are no inherited methods and this is the base class, just show the base class methods as normal
  if (inherited.length === 0 && base && base.name === className && base.methods.length > 0) {
    return (
      <div>
        {base.methods.map((method) => {
          const anchorId = `${toKebabCase(base.name)}-${toKebabCase(method.name)}`;
          const signature = `${base.name}:${method.name}()${method.returnType ? `: ${method.returnType}` : ''}`;
          return (
            <div key={method.name}>
              <Heading as="h4" id={anchorId}>
                <code>{signature}</code>
              </Heading>
              <p>{method.description}</p>
            </div>
          );
        })}
      </div>
    );
  }

  if (inherited.length === 0) return null;

  return (
    <div>
      <Heading as="h2">Inherited Methods</Heading>
      {inherited.map((ancestor) => (
        <div key={ancestor.name}>
          <Heading as="h3">
            From <a href={ancestor.docLink}><code>{ancestor.name}</code></a>:
          </Heading>
          {ancestor.methods.map((method) => {
            const anchorId = `${toKebabCase(ancestor.name)}-${toKebabCase(method.name)}`;
            const signature = `${ancestor.name}:${method.name}()${method.returnType ? `: ${method.returnType}` : ''}`;
            return (
              <div key={method.name}>
                <Heading as="h4" id={anchorId}>
                  <code>{signature}</code>
                </Heading>
                <p>{method.description}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default InheritedComponent;
