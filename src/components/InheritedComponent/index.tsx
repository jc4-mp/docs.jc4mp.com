import React from 'react';
import Heading from '@theme/Heading';
import { classDocs, ClassName, eventDocs, EventContextName } from '../../data/classDocs';
import CodeBlock from '@theme/CodeBlock';
import Markdown from 'react-markdown';

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

  // Get all method names that are overridden by child classes
  function getOverriddenMethods(chain: { name: ClassName; methods: typeof classDocs[ClassName]['methods']; docLink: string }[]): Set<string> {
    const overridden = new Set<string>();
    const allMethodNames = new Set<string>();
    
    // Go through chain from most derived to least derived
    for (let i = chain.length - 1; i >= 0; i--) {
      const currentClass = chain[i];
      for (const method of currentClass.methods) {
        if (allMethodNames.has(method.name)) {
          // This method name already exists in a more derived class, so it's overridden
          overridden.add(method.name);
        } else {
          allMethodNames.add(method.name);
        }
      }
    }
    
    return overridden;
  }

  // Utility to create kebab-case anchor ids
  function toKebabCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
  }

  const chain = getInheritanceChain(className);
  const overriddenMethods = getOverriddenMethods(chain);
  
  // Remove the last item (the class itself), only show inherited, and only those with methods
  const inherited = chain.slice(0, -1).filter((ancestor) => ancestor.methods.length > 0);
  const base = chain[chain.length - 1];

  // Check if there are any non-overridden inherited methods
  const hasNonOverriddenInheritedMethods = inherited.some(ancestor => 
    ancestor.methods.some(method => !overriddenMethods.has(method.name))
  );

  // If there are no non-overridden inherited methods, just show the current class methods
  if (!hasNonOverriddenInheritedMethods && base && base.methods.length > 0) {
    return (
      <div>
        {base.methods.map((method) => {
          const anchorId = `${toKebabCase(base.name)}-${toKebabCase(method.name)}`;
          // Use the original class name (remove _Server suffix) for the signature
          const displayClassName = base.name.replace('_Server', '').replace('_Client', '');
          const signature = `${displayClassName}:${method.name}${method.args || '()'}${method.returnType ? `: ${method.returnType}` : ''}`;
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

  if (!hasNonOverriddenInheritedMethods && (!base || base.methods.length === 0)) return null;

  return (
    <div>
      <Heading as="h2">Inherited Methods</Heading>
      {inherited.map((ancestor) => {
        // Filter out methods that are overridden by child classes
        const nonOverriddenMethods = ancestor.methods.filter(method => !overriddenMethods.has(method.name));
        
        if (nonOverriddenMethods.length === 0) return null;
        
        return (
          <div key={ancestor.name}>
            <Heading as="h3">
              From <a href={ancestor.docLink}><code>{ancestor.name}</code></a>:
            </Heading>
            {nonOverriddenMethods.map((method) => {
              const anchorId = `${toKebabCase(ancestor.name)}-${toKebabCase(method.name)}`;
              const signature = `${ancestor.name}:${method.name}${method.args || '()'}${method.returnType ? `: ${method.returnType}` : ''}`;
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
      })}
      
      {/* Show current class methods */}
      {base && base.methods.length > 0 && (
        <div>
          {base.methods.map((method) => {
            const anchorId = `${toKebabCase(base.name)}-${toKebabCase(method.name)}`;
            // Use the original class name (remove _Server suffix) for the signature
            const displayClassName = base.name.replace('_Server', '').replace('_Client', '');
            const signature = `${displayClassName}:${method.name}${method.args || '()'}${method.returnType ? `: ${method.returnType}` : ''}`;
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
      )}
    </div>
  );
};

/**
 * Displays all inherited events for a given event context, grouped by ancestor context.
 * Usage: <InheritedEventsComponent contextName="ClientEvents" />
 */
export const InheritedEventsComponent: React.FC<{ contextName: EventContextName }> = ({ contextName }) => {
  // Recursively collect inherited events
  function getEventInheritanceChain(name: EventContextName): { name: EventContextName; events: typeof eventDocs[EventContextName]['events']; docLink: string }[] {
    const chain: { name: EventContextName; events: typeof eventDocs[EventContextName]['events']; docLink: string }[] = [];
    let current: EventContextName | undefined = name;
    while (current) {
      const doc = eventDocs[current];
      if (doc) {
        chain.unshift({ name: doc.name, events: doc.events, docLink: doc.docLink });
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

  const chain = getEventInheritanceChain(contextName);
  // Remove the last item (the context itself), only show inherited, and only those with events
  const inherited = chain.slice(0, -1).filter((ancestor) => ancestor.events.length > 0);
  const base = chain[chain.length - 1];

  // If there are no inherited events and this is the base context, just show the base context events as normal
  if (inherited.length === 0 && base && base.name === contextName && base.events.length > 0) {
    return (
      <div>
        {base.events.map((event) => {
          const anchorId = toKebabCase(event.name);
          return (
            <div key={event.name}>
              <Heading as="h4" id={anchorId}>
                <code>{event.name}: {event.signature}</code>
              </Heading>
              <Markdown>{event.description}</Markdown>
              {event.example && (
                <CodeBlock language="lua">
                  {event.example}
                </CodeBlock>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  if (inherited.length === 0) return null;

  return (
    <div>
      <Heading as="h2">Inherited Events</Heading>
      {inherited.map((ancestor) => (
        <div key={ancestor.name}>
          <Heading as="h3">
            From <a href={ancestor.docLink}><code>{ancestor.name}</code></a>:
          </Heading>
          {ancestor.events.map((event) => {
            const anchorId = `${toKebabCase(ancestor.name)}-${toKebabCase(event.name)}`;
            return (
              <div key={event.name}>
                <Heading as="h4" id={anchorId}>
                  <code>{event.name}: {event.signature}</code>
                </Heading>
                <Markdown>{event.description}</Markdown>
                {event.example && (
                  <CodeBlock language="lua">
                    {event.example}
                  </CodeBlock>
                )}
              </div>
            );
          })}
        </div>
      ))}
      
      {/* Show current context events */}
      {base && base.events.length > 0 && (
        <div>
          <Heading as="h3">
            <code>{base.name}</code> Events:
          </Heading>
          {base.events.map((event) => {
            const anchorId = toKebabCase(event.name);
            return (
              <div key={event.name}>
                <Heading as="h4" id={anchorId}>
                  <code>{event.name}: {event.signature}</code>
                </Heading>
                <Markdown>{event.description}</Markdown>
                {event.example && (
                  <CodeBlock language="lua">
                    {event.example}
                  </CodeBlock>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InheritedComponent;
