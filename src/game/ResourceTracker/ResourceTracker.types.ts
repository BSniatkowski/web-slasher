import { Mesh, Scene } from "three";

export type TEntity = Mesh;

export interface ITrackedResource {
  id: string;
  entity: TEntity;
}

export interface IResourceTrackerState {
  resources: Array<ITrackedResource>;
}

export type TTrackResource = (resource: ITrackedResource) => void;

export type TGetTrackedResource = (id: string) => TEntity | undefined;

export type TDisposeTrackedResourceById = (id: string) => void;

export type TDisposeTrackedResource = (resource: ITrackedResource) => void;

export type TDisposeMultipleTrackedResources = (ids: Array<string>) => void;

export type TDisposeAllResources = () => void;

export type TCreateResourceTracker = (Scene: Scene) => {
  trackResource: TTrackResource;
  getTrackedResource: TGetTrackedResource;
  disposeTrackedResource: TDisposeTrackedResource;
  disposeTrackedResourceById: TDisposeTrackedResourceById;
  disposeMultipleTrackedResources: TDisposeMultipleTrackedResources;
  disposeAllResources: TDisposeAllResources;
};

export type TResourceTracker = ReturnType<TCreateResourceTracker>;
