function HomeTeaserVid() {
  return (
    <section className="mt-10 w-full">
      <video
        className="aspect-2/3 h-auto w-full object-cover grayscale sm:aspect-video"
        src="/VID.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
    </section>
  );
}

export default HomeTeaserVid;
