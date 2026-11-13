import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { Link, useParams } from 'react-router-dom';

import buttonCss from '../../components/Button/Button.module.css';
import Loading from '../../components/Loading/Loading';
import { getCamperById, getCamperReviews } from '../../services/campersService';
import css from './CamperDetailsPage.module.css';
import BookingForm from './components/BookingForm/BookingForm';
import CamperGallery from './components/CamperGallery/CamperGallery';
import CamperOverview from './components/CamperOverview/CamperOverview';
import Reviews from './components/Reviews/Reviews';
import VehicleDetails from './components/VehicleDetails/VehicleDetails';

export default function CamperDetailsPage() {
  const { id = '' } = useParams();

  const {
    data: camper,
    isPending: isCamperPending,
    isError: isCamperError,
  } = useQuery({
    queryKey: ['camper', id],
    queryFn: () => getCamperById(id),
    enabled: Boolean(id),
  });

  const {
    data: reviews = [],
    isPending: areReviewsPending,
    isError: areReviewsError,
  } = useQuery({
    queryKey: ['camperReviews', id],
    queryFn: () => getCamperReviews(id),
    enabled: Boolean(id),
  });

  if (!id) {
    return <p>Camper ID is missing.</p>;
  }

  if (isCamperPending || areReviewsPending) {
    return <Loading />;
  }

  if (isCamperError || areReviewsError) {
    return (
      <section className={css.errorPage} role="alert" aria-labelledby="camper-error-title">
        <div className={css.errorContent}>
          <h1 id="camper-error-title" className={css.errorTitle}>
            Unable to load camper
          </h1>

          <p className={css.errorDescription}>
            Something went wrong while loading this camper. Please return to the catalog and try
            again.
          </p>

          <Link to="/catalog" className={clsx(buttonCss.button, buttonCss.primary, css.errorLink)}>
            Back to catalog
          </Link>
        </div>
      </section>
    );
  }

  if (!camper) {
    return null;
  }

  const features = [
    camper.transmission,
    camper.engine,
    ...camper.amenities,
    camper.form.replaceAll('_', ' '),
  ];

  return (
    <div className={css.page}>
      <div className={css.topSection}>
        <CamperGallery images={camper.gallery} camperName={camper.name} />

        <div className={css.infoContainer}>
          <CamperOverview
            name={camper.name}
            rating={camper.rating}
            totalReviews={camper.totalReviews}
            location={camper.location}
            price={camper.price}
            description={camper.description}
          />

          <VehicleDetails
            features={features}
            form={camper.form.replaceAll('_', ' ')}
            length={camper.length}
            width={camper.width}
            height={camper.height}
            tank={camper.tank}
            consumption={camper.consumption}
          />
        </div>
      </div>

      <div className={css.reviewsSection}>
        <h2 className={css.reviewsTitle}>Reviews</h2>

        <div className={css.reviewsContent}>
          <Reviews reviews={reviews} />
          <BookingForm camperId={camper.id} />
        </div>
      </div>
    </div>
  );
}
