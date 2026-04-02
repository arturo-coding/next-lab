import dynamic from 'next/dynamic';

const RoutingExample = dynamic(() => import('./RoutingExample'));
const DataFetchingExample = dynamic(() => import('./DataFetchingExample'));

export const PREVIEW_COMPONENTS: Record<string, React.ComponentType> = {
  RoutingExample,
  DataFetchingExample,
};
