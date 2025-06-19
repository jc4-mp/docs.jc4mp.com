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

  // Build a method resolution table that tracks which class provides each method
  function buildMethodResolution(chain: { name: ClassName; methods: typeof classDocs[ClassName]['methods']; docLink: string }[]): Map<string, { method: typeof classDocs[ClassName]['methods'][0]; fromClass: ClassName; docLink: string }> {
    const methodResolution = new Map<string, { method: typeof classDocs[ClassName]['methods'][0]; fromClass: ClassName; docLink: string }>();
    
    // Go through chain from least derived to most derived (so later overrides win)
    for (const classInfo of chain) {
      for (const method of classInfo.methods) {
        methodResolution.set(method.name, {
          method,
          fromClass: classInfo.name,
          docLink: classInfo.docLink
        });
      }
    }
    
    return methodResolution;
  }

  // Get methods that should be shown for each ancestor class
  function getMethodsForAncestor(
    ancestorClass: { name: ClassName; methods: typeof classDocs[ClassName]['methods']; docLink: string },
    methodResolution: Map<string, { method: typeof classDocs[ClassName]['methods'][0]; fromClass: ClassName; docLink: string }>
  ): typeof classDocs[ClassName]['methods'] {
    // Only show methods that are actually defined by this ancestor and not overridden by a more derived class
    return ancestorClass.methods.filter(method => {
      const resolvedMethod = methodResolution.get(method.name);
      return resolvedMethod && resolvedMethod.fromClass === ancestorClass.name;
    });
  }

  // Utility to create kebab-case anchor ids
  function toKebabCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
  }

  const chain = getInheritanceChain(className);
  const methodResolution = buildMethodResolution(chain);
  
  // Remove the last item (the class itself), only show inherited, and only those with methods
  const inherited = chain.slice(0, -1).filter((ancestor) => ancestor.methods.length > 0);
  const base = chain[chain.length - 1];

  // Check if there are any inherited methods that should be shown
  const hasInheritedMethods = inherited.some(ancestor => 
    getMethodsForAncestor(ancestor, methodResolution).length > 0
  );

  // If there are no inherited methods, just show the current class methods
  if (!hasInheritedMethods && base && base.methods.length > 0) {
    return (
      <div>
        <Heading as="h2">Class Methods</Heading>
        {base.methods.map((method) => {
          const anchorId = `${toKebabCase(base.name)}-${toKebabCase(method.name)}`;
          // Use the original class name (remove suffixes) for the signature
          const displayClassName = base.name.replace('_Server', '').replace('_Client', '').replace('_Shared', '');
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

  if (!hasInheritedMethods && (!base || base.methods.length === 0)) return null;

  return (
    <div>
      <Heading as="h2">Inherited Methods</Heading>
      {inherited.map((ancestor) => {
        // Get methods that should be shown for this ancestor
        const methodsToShow = getMethodsForAncestor(ancestor, methodResolution);
        
        if (methodsToShow.length === 0) return null;
        
        return (
          <div key={ancestor.name}>
            <Heading as="h3">
              From <a href={ancestor.docLink}>{ancestor.name.replace('_Server', '').replace('_Client', '').replace('_Shared', '')}</a>:
            </Heading>
            {methodsToShow.map((method) => {
              const anchorId = `${toKebabCase(ancestor.name)}-${toKebabCase(method.name)}`;
              const displayClassName = ancestor.name.replace('_Server', '').replace('_Client', '').replace('_Shared', '');
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
      })}
      
      {/* Show current class methods */}
      {base && base.methods.length > 0 && (
        <div>
          <Heading as="h2">
            Class Methods
          </Heading>
                  {base.methods.map((method) => {
          const anchorId = `${toKebabCase(base.name)}-${toKebabCase(method.name)}`;
          // Use the original class name (remove suffixes) for the signature
          const displayClassName = base.name.replace('_Server', '').replace('_Client', '').replace('_Shared', '');
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

  // Build an event resolution table that tracks which context provides each event
  function buildEventResolution(chain: { name: EventContextName; events: typeof eventDocs[EventContextName]['events']; docLink: string }[]): Map<string, { event: typeof eventDocs[EventContextName]['events'][0]; fromContext: EventContextName; docLink: string }> {
    const eventResolution = new Map<string, { event: typeof eventDocs[EventContextName]['events'][0]; fromContext: EventContextName; docLink: string }>();
    
    // Go through chain from least derived to most derived (so later overrides win)
    for (const contextInfo of chain) {
      for (const event of contextInfo.events) {
        eventResolution.set(event.name, {
          event,
          fromContext: contextInfo.name,
          docLink: contextInfo.docLink
        });
      }
    }
    
    return eventResolution;
  }

  // Get events that should be shown for each ancestor context
  function getEventsForAncestor(
    ancestorContext: { name: EventContextName; events: typeof eventDocs[EventContextName]['events']; docLink: string },
    eventResolution: Map<string, { event: typeof eventDocs[EventContextName]['events'][0]; fromContext: EventContextName; docLink: string }>
  ): typeof eventDocs[EventContextName]['events'] {
    // Only show events that are actually defined by this ancestor and not overridden by a more derived context
    return ancestorContext.events.filter(event => {
      const resolvedEvent = eventResolution.get(event.name);
      return resolvedEvent && resolvedEvent.fromContext === ancestorContext.name;
    });
  }

  // Utility to create kebab-case anchor ids
  function toKebabCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
  }

  const chain = getEventInheritanceChain(contextName);
  const eventResolution = buildEventResolution(chain);
  
  // Remove the last item (the context itself), only show inherited, and only those with events
  const inherited = chain.slice(0, -1).filter((ancestor) => ancestor.events.length > 0);
  const base = chain[chain.length - 1];

  // Check if there are any inherited events that should be shown
  const hasInheritedEvents = inherited.some(ancestor => 
    getEventsForAncestor(ancestor, eventResolution).length > 0
  );

  // If there are no inherited events, just show the current context events
  if (!hasInheritedEvents && base && base.events.length > 0) {
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

  if (!hasInheritedEvents && (!base || base.events.length === 0)) return null;

  return (
    <div>
      {inherited.map((ancestor) => {
        // Get events that should be shown for this ancestor
        const eventsToShow = getEventsForAncestor(ancestor, eventResolution);
        
        if (eventsToShow.length === 0) return null;
        
        return (
          <div key={ancestor.name}>
            {eventsToShow.map((event) => {
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
        );
      })}
      
      {/* Show current context events */}
      {base && base.events.length > 0 && (
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
      )}
    </div>
  );
};

export default InheritedComponent;
