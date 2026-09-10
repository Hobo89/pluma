import { studioPhotoCluster } from "./PhotoCluster";
import { FeatureStory } from "./FeatureStory";

/**
 * The studio block shared by the homepage and the about page: video, stills,
 * highlights, booking action and the access note.
 */
export function StudioFeature() {
  return (
    <FeatureStory
      titleKey="studio.title"
      descriptionKey="studio.description"
      collage={studioPhotoCluster}
      collageLabelKey="studio.collageLabel"
      video="/videos/studio.mp4"
      videoPoster="/assets/images/studio-room.jpg"
      videoLabelKey="studio.videoLabel"
      actionLabelKey="sticky.label"
      bookingPlacement="studio"
      reverse
      highlights="studio"
      noteKey="studio.accessNote"
    />
  );
}
