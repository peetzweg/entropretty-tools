// const ticking = useRef<boolean>(false);
// useEffect(() => {
//   const onScroll = () => {
//     const scrollPercentage = getScrollPercentage();
//     if (scrollPercentage > 90) {
//       if (!ticking.current) {
//         ticking.current = true;
//         window.requestAnimationFrame(() => {
//           const newSeeds = Array(9)
//             .fill(1)
//             .map(() => getSeed("Procedural"));
//           setSeeds((oldSeeds) => [...oldSeeds, ...newSeeds]);
//           ticking.current = false;
//         });
//       }
//     }
//   };
//   const getScrollPercentage = () => {
//     const scrollTop = window.scrollY || document.documentElement.scrollTop;
//     const scrollHeight =
//       document.documentElement.scrollHeight -
//       document.documentElement.clientHeight;
//     return (scrollTop / scrollHeight) * 100;
//   };

//   window.addEventListener("scroll", onScroll);
//   return () => window.removeEventListener("scroll", onScroll);
// }, [mode]);
