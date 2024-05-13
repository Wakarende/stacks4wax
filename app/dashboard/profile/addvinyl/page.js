// pages/vinyls/add.js or a similar page file
"use client";

import AddVinylForm from "@/app/components/forms/vinylforms/addVinylForm";

export default function AddVinylPage() {
  return (
    <div className="max-w-md mx-auto p-5">
      <p className="text-xl font-bold">Add New Vinyl</p>
      <AddVinylForm />
    </div>
  );
}
