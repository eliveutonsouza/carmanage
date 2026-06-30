type DataCarMaintenanceTypes = {
  id: string;
  name: string;
  type: "PREVENTIVA" | "CORRETIVA";
  lastMaintenance: Date;
  nextMaintenance: Date;
  status: "VENCIDA" | "CONFORME";
  carId: string;
};
