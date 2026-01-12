import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { GetImageResult } from "astro";

interface Props {
  slides: Array<GetImageResult>;
  previousLabel: string;
  nextLabel: string;
  endingTitle: string;
  endingMessage: string;
  backBashboard: string;
  backDashboardPath: string;
  isRtl: boolean;
}

export default function Slider(props: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [showCongrats, setShowCongrats] = useState<boolean>(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    skipSnaps: false,
    direction: props.isRtl ? "rtl" : "ltr",
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const handlePrevClick = useCallback(
    (evt: React.MouseEvent) => {
      evt.stopPropagation();
      if (showCongrats) {
        setShowCongrats(false);
        emblaApi?.scrollTo(0);
        return;
      }
      emblaApi?.scrollPrev();
    },
    [emblaApi, showCongrats]
  );

  const handleNextClick = useCallback(
    (evt: React.MouseEvent) => {
      evt.stopPropagation();
      if (selectedIndex === props.slides.length - 1) {
        setShowCongrats(true);
        return;
      }
      emblaApi?.scrollNext();
    },
    [emblaApi, selectedIndex, props.slides.length]
  );

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (showCongrats) {
    return (
      <section className="flex flex-col h-full" aria-label="Congratulations">
        <div className="flex-1 flex flex-col justify-center items-center space-y-4 md:space-y-7">
          <h2 className="text-2xl md:text-3xl font-medium text-[#07857E]">
            {props.endingTitle}
          </h2>
          <p className="text-center">{props.endingMessage}</p>
          <a
            href={props.backDashboardPath}
            className="px-5 py-3 md:px-6 md:py-4 text-sm md:text-base bg-[#07857E] text-white rounded hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            aria-label="Return to start"
          >
            {props.backBashboard}
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col h-full" aria-label="Image Slider">
      <div className="flex-1 flex flex-col justify-center space-y-4 md:space-y-7">
        <div
          className="overflow-hidden relative aspect-[4/3] md:aspect-auto"
          ref={emblaRef}
        >
          <ul className="flex h-full list-none m-0 p-0">
            {props.slides.map((slide, slideIdx) => (
              <li
                className="flex-[0_0_100%] flex items-center justify-center"
                key={`slide-#${slideIdx}`}
              >
                <img
                  src={slide.src}
                  alt={`Slide ${slideIdx + 1}`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center gap-2 md:gap-4 px-4">
          <button
            className="px-5 py-3 md:px-6 md:py-4 text-sm md:text-base bg-[#07857E] text-white rounded hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            onClick={handlePrevClick}
            disabled={selectedIndex === 0}
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              {...(props.isRtl
                ? { style: { transform: "rotate(180deg)" } }
                : {})}
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            {props.previousLabel}
          </button>
          <button
            className="px-5 py-3 md:px-6 md:py-4 text-sm md:text-base bg-[#07857E] text-white rounded hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            onClick={handleNextClick}
            aria-label="Next slide"
          >
            {props.nextLabel}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              {...(props.isRtl
                ? { style: { transform: "rotate(180deg)" } }
                : {})}
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
      <nav
        className="flex flex-col items-center gap-2 py-8 md:gap-4 md:py-16"
        aria-label="Slider controls"
      >
        <div className="flex flex-wrap gap-2" role="tablist">
          {props.slides.map((_, slideIdx) => (
            <button
              key={`button-slide-#${slideIdx}`}
              className={`w-1.5 h-1.5 rounded-full cursor-default transition-colors ${
                slideIdx === selectedIndex ? "bg-[#07857E]" : "bg-gray-200"
              }`}
              aria-label={`Go to slide ${slideIdx + 1}`}
              role="tab"
              aria-selected={slideIdx === selectedIndex}
            />
          ))}
        </div>
      </nav>
    </section>
  );
}
