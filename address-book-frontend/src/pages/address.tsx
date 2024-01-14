import React, { useState, useEffect, useRef } from "react";
import { DataView } from "primereact/dataview";
import { useAppDispatch, useAppSelector } from "../store";
import { deleteAddress, getAddresses } from "../store/address.store";
import { IAddress } from "../interfaces";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

export const Address = () => {
  const toast = useRef<Toast>(null);
  const addresses = useAppSelector((state) => state.address.addresses);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAddresses());
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteAddress(id)).unwrap();
    } catch (error: any) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail:
          error?.response?.data?.message || "An error happened while deleting",
        life: 3000,
      });
    }
  };

  const itemTemplate = (address: IAddress) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">
                {address.name} {address.surname}
              </div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <span className="font-semibold">{address.email}</span>
                </span>
              </div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <span className="font-semibold">
                    +{address.phone?.countryCode} {address.phone?.number}
                  </span>
                </span>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <Button
                icon="pi pi-times"
                severity="danger"
                aria-label="Cancel"
                onClick={() => handleDelete(address._id)}
              />
              <Button
                label="Edit"
                severity="success"
                raised
                onClick={() => navigate(`/address/${address._id}`)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <DataView
        value={addresses || []}
        itemTemplate={itemTemplate}
        paginator
        rows={5}
      />
    </div>
  );
};
