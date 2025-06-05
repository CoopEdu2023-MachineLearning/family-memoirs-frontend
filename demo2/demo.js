gsap.registerPlugin(ScrollTrigger);

const boxes = gsap.utils.toArray('.box');
boxes.forEach(box => {
  gsap.to(box, {
    scrollTrigger: {
      start: "top 400px",
      end: "top 100px",
      trigger: box,
      scrub: 1,
      markers: true,
      pin: true,
    },
    x: -500,
  })
});