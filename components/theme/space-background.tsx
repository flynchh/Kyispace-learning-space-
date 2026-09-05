export function SpaceBackground() {
  return (
    <div className="space-scene" aria-hidden="true">
      <div className="star-layer star-layer-one" />
      <div className="star-layer star-layer-two" />
      <div className="star-layer star-layer-three" />
      <div className="space-nebula space-nebula-one" />
      <div className="space-nebula space-nebula-two" />
      <div className="planet planet-main">
        <span className="planet-ring" />
      </div>
      <span className="meteor meteor-one" />
      <span className="meteor meteor-two" />
      <span className="meteor meteor-three" />
    </div>
  );
}
