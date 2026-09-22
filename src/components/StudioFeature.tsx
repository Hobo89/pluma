import { studioPhotoCluster } from "./PhotoCluster";
import { FeatureStory } from "./FeatureStory";

/**
 * The studio block shared by the homepage and the about page: video, stills,
 * highlights, booking action and the access note.
 */
export function StudioFeature({
  highlightTitle = false,
}: {
  highlightTitle?: boolean;
}) {
  return (
    <FeatureStory
      id="studio"
      titleKey="studio.title"
      titleHighlightKey={highlightTitle ? "studio.titleHighlight" : undefined}
      descriptionKey="studio.description"
      collage={studioPhotoCluster}
      collageLabelKey="studio.collageLabel"
      video="/videos/studio.mp4?v=v5-2026-09-23"
      videoPoster="/assets/images/studio-room.jpg?v=v5-2026-09-23"
      videoLabelKey="studio.videoLabel"
      actionLabelKey="sticky.label"
      bookingPlacement="studio"
      reverse
      highlights="studio"
      noteKey="studio.accessNote"
    />
  );
}
