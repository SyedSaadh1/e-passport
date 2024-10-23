import Spinner from '../ui/common/spinner';

export default function Loading() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl flex items-center justify-center min-h-[70vh]">
      <Spinner />
    </main>
  );
}
