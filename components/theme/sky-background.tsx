const birds = [
  { className: 'bird bird-one', size: 'bird-medium' },
  { className: 'bird bird-two', size: 'bird-small' },
  { className: 'bird bird-three', size: 'bird-large' },
  { className: 'bird bird-four', size: 'bird-small' },
  { className: 'bird bird-five', size: 'bird-medium' },
];

export function SkyBackground() {
  return (
    <div className="sky-scene" aria-hidden="true">
      <div className="sun-glow" />
      <div className="cloud cloud-one"><span /><span /><span /></div>
      <div className="cloud cloud-two"><span /><span /><span /></div>
      <div className="cloud cloud-three"><span /><span /><span /></div>
      {birds.map((bird) => <i className={`${bird.className} ${bird.size}`} key={bird.className} />)}
    </div>
  );
}
