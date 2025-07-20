import { Mesh } from "three";
import type {
  IResourceTrackerState,
  TCreateResourceTracker,
  TDisposeAllResources,
  TDisposeMultipleTrackedResources,
  TDisposeTrackedResource,
  TDisposeTrackedResourceById,
  TGetTrackedResource,
  TTrackResource,
} from "./ResourceTracker.types";

export const createResourceTracker: TCreateResourceTracker = () => {
  const state: IResourceTrackerState = { resources: [] };

  const trackResource: TTrackResource = (resource) => {
    state.resources.push(resource);
  };

  const getTrackedResource: TGetTrackedResource = (id) =>
    state.resources.find((resource) => resource.id === id)?.entity;

  const disposeTrackedResourceById: TDisposeTrackedResourceById = (id) => {
    const resource = state.resources.find((resource) => resource.id === id);

    if (!resource) return;

    try {
      if (resource.entity instanceof Mesh) {
        resource.entity.remove();
      }

      state.resources = state.resources.filter(
        (resource) => resource.id !== id
      );
    } catch (error) {
      console.error(
        `Could not dispose resource ${resource.id}. Error message: ${error}`
      );
    }
  };

  const disposeTrackedResource: TDisposeTrackedResource = (resource) => {
    if (!resource) return;

    try {
      if (resource.entity instanceof Mesh) {
        resource.entity.remove();
      }

      state.resources = state.resources.filter(
        (resource) => resource.id !== resource.id
      );
    } catch (error) {
      console.error(
        `Could not dispose resource ${resource.id}. Error message: ${error}`
      );
    }
  };

  const disposeMultipleTrackedResources: TDisposeMultipleTrackedResources = (
    ids
  ) => {
    const resourcesIds = state.resources.filter((resource) =>
      ids.includes(resource.id)
    );

    for (const { id } of resourcesIds) {
      disposeTrackedResourceById(id);
    }
  };

  const disposeAllResources: TDisposeAllResources = () => {
    for (const resource of state.resources) {
      disposeTrackedResource(resource);
    }
  };

  return {
    trackResource,
    getTrackedResource,
    disposeTrackedResource,
    disposeTrackedResourceById,
    disposeMultipleTrackedResources,
    disposeAllResources,
  };
};
