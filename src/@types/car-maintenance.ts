type DataCarMaintenanceTypes = {
  id: string;
  name: string;
  lastMaintenance: Date;
  nextMaintenance: Date;
  status: "VENCIDA" | "CONFORME";
  carId: string;
};
