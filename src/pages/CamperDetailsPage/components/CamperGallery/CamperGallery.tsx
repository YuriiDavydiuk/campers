import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

import { useState } from 'react';
import { FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper/types';

import type { CamperImage } from '../../../../types/camper';
import css from './CamperGallery.module.css';

interface CamperGalleryProps {
  images: CamperImage[];
  camperName: string;
}

export default function CamperGallery({ images, camperName }: CamperGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className={css.gallery}>
      <Swiper
        className={css.mainGallery}
        modules={[Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={0}
        slidesPerView={1}
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.id} className={css.mainSlide}>
            <img
              src={image.original}
              alt={`${camperName} view ${index + 1}`}
              className={css.mainImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className={css.thumbnails}
        modules={[FreeMode, Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={12}
        slidesPerView={4}
        breakpoints={{
          768: { spaceBetween: 24 },
          1158: { spaceBetween: 32 },
        }}
        freeMode
        watchSlidesProgress
      >
        {images.map(image => (
          <SwiperSlide key={image.id} className={css.thumbnailSlide}>
            <img src={image.thumb} alt="" className={css.thumbnailImage} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
