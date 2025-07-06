import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCarStore } from "../../stores/useCarStore";
import { CarsList } from "../../components/CarsList";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { FiAlertCircle, FiRefreshCw } from "react-icons/fi";

export const CarsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { cars, loading, error, fetchCars } = useCarStore();

  useEffect(() => {
    fetchCars({
      make: searchParams.get("make") ?? undefined,
      type: searchParams.get("type") ?? undefined,
      transmission: searchParams.get("transmission") ?? undefined,
      fuelType: searchParams.get("fuelType") ?? undefined,
    });
  }, [searchParams, fetchCars]);

  const retry = useCallback(() => {
    fetchCars({
      make: searchParams.get("make") ?? undefined,
      type: searchParams.get("type") ?? undefined,
      transmission: searchParams.get("transmission") ?? undefined,
      fuelType: searchParams.get("fuelType") ?? undefined,
    });
  }, [fetchCars, searchParams]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 text-center">
        <div className="rounded-full bg-red-100 p-4">
          <FiAlertCircle size={32} className="text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          Error loading cars
        </h3>
        <p className="text-gray-600">{error}</p>
        <button
          onClick={retry}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          <FiRefreshCw size={18} />
          Try again
        </button>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 rounded-xl bg-white p-8 text-center">
        <div className="rounded-full bg-gray-100 p-4">
          <FiAlertCircle size={32} className="text-gray-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">No cars found</h3>
        <p className="text-gray-600">
          Try adjusting your filters to see more results
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">
          Available Cars ({cars.length})
        </h2>
      </div>
      <CarsList
        cars={cars}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
    </div>
  );
};
