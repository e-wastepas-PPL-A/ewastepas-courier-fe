const NavbarSkeleton = () => {
  return (
    <div className="p-6 mx-auto border-1 border-revamp-neutral-8 items-center h-[112px]">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 w-48 bg-revamp-neutral-6 rounded-lg animate-pulse" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-revamp-neutral-6 rounded-full animate-pulse" />
          <div className="h-4 w-20 bg-revamp-neutral-6 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default NavbarSkeleton;
