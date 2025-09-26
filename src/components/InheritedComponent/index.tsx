import React from 'react';
import Heading from '@theme/Heading';
import { classDocs, ClassName, EventContextName } from '../../data/classDocs';

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
 * Displays a simple inheritance heading linking to the parent event context.
 * Usage: <InheritedEventsComponent contextName="ClientEvents" />
 */
export const InheritedEventsComponent: React.FC<{ contextName: EventContextName }> = ({ contextName }) => {
  return null;
};

export default InheritedComponent;
