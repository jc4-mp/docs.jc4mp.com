import React from 'react';
import Heading from '@theme/Heading';
import { classDocs, ClassName, eventDocs, EventContextName } from '../../data/classDocs';
import CodeBlock from '@theme/CodeBlock';
import Markdown from 'react-markdown';

/**
 * Displays a simple inheritance heading linking to the parent class.
 * Usage: <InheritedComponent className="NetPlayer" />
 */
export const InheritedComponent: React.FC<{ className: ClassName }> = ({ className }) => {
  const classDoc = classDocs[className];
  
  if (!classDoc || !classDoc.parent) {
    return null;
  }

  const parentDoc = classDocs[classDoc.parent];
  if (!parentDoc) {
    return null;
  }

  const displayParentName = parentDoc.name.replace('_Server', '').replace('_Client', '').replace('_Shared', '');

  return (
    <Heading as="h3">
      Inherits from <a href={parentDoc.docLink}>{displayParentName}</a>
    </Heading>
  );
};

/**
 * Displays all events for a given event context.
 * Usage: <InheritedEventsComponent contextName="ClientEvents" />
 */
export const InheritedEventsComponent: React.FC<{ contextName: EventContextName }> = ({ contextName }) => {
  // Utility to create kebab-case anchor ids
  function toKebabCase(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
  }

  const contextDoc = eventDocs[contextName];
  
  if (!contextDoc || contextDoc.events.length === 0) {
    return null;
  }

  return (
    <div>
      {contextDoc.events.map((event) => {
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
};

export default InheritedComponent;
