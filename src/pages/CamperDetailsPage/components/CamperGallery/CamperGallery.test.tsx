import { describe, expect, jest, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';

import { camperDetails } from '../../../../test/fixtures';
import CamperGallery from './CamperGallery';

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: ReactNode }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock('swiper/modules', () => ({
  FreeMode: {},
  Thumbs: {},
}));

describe('CamperGallery', () => {
  test('renders original images with accessible alt text', () => {
    render(<CamperGallery images={camperDetails.gallery} camperName={camperDetails.name} />);

    expect(screen.getByRole('img', { name: 'Mavericks view 1' })).toHaveAttribute(
      'src',
      'mavericks-original-1.jpg'
    );
    expect(screen.getByRole('img', { name: 'Mavericks view 2' })).toHaveAttribute(
      'src',
      'mavericks-original-2.jpg'
    );
  });

  test('renders a decorative thumbnail for every image', () => {
    const { container } = render(
      <CamperGallery images={camperDetails.gallery} camperName={camperDetails.name} />
    );

    const thumbnails = container.querySelectorAll('img[alt=""]');
    expect(thumbnails).toHaveLength(2);
    expect(thumbnails[0]).toHaveAttribute('src', 'mavericks-thumb-1.jpg');
    expect(thumbnails[1]).toHaveAttribute('src', 'mavericks-thumb-2.jpg');
  });
});
