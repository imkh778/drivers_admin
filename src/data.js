import { formatDate } from "./format.js";

export const TODAY = "2026-11-25";

export const vehicles = [
  {
    id: "VH-01",
    reg: "KA 01 MJ 4821",
    model: "Tata Ace Gold",
    type: "Light commercial",
    year: 2022,
    fuelType: "Diesel",
    status: "On trip",
    driverId: "DR-01",
    location: "Marathahalli",
    depot: "Whitefield Depot",
    odometer: 68420,
    capacity: "750 kg",
    insuranceUntil: "2027-03-18",
    fitnessUntil: "2027-01-04",
    lastService: "2026-10-12",
    x: 785,
    y: 318,
    speed: 36,
    ping: "1 min ago",
  },
  {
    id: "VH-02",
    reg: "KA 03 EF 2290",
    model: "Mahindra Bolero Pik-Up",
    type: "Pickup",
    year: 2021,
    fuelType: "Diesel",
    status: "Active",
    driverId: "DR-02",
    location: "Hebbal",
    depot: "Hebbal Yard",
    odometer: 91220,
    capacity: "1,250 kg",
    insuranceUntil: "2027-06-30",
    fitnessUntil: "2027-04-12",
    lastService: "2026-09-28",
    x: 490,
    y: 156,
    speed: 0,
    ping: "6 min ago",
  },
  {
    id: "VH-03",
    reg: "KA 05 HN 7743",
    model: "Ashok Leyland Dost+",
    type: "Light commercial",
    year: 2023,
    fuelType: "Diesel",
    status: "On trip",
    driverId: "DR-03",
    location: "Electronic City",
    depot: "Electronic City Hub",
    odometer: 42040,
    capacity: "1,250 kg",
    insuranceUntil: "2027-08-19",
    fitnessUntil: "2027-05-02",
    lastService: "2026-11-02",
    x: 600,
    y: 628,
    speed: 42,
    ping: "Just now",
  },
  {
    id: "VH-04",
    reg: "KA 02 PQ 1186",
    model: "Maruti Suzuki Eeco",
    type: "Van",
    year: 2020,
    fuelType: "CNG",
    status: "Idle",
    driverId: null,
    location: "Jayanagar Depot",
    depot: "Jayanagar Depot",
    odometer: 112340,
    capacity: "5 seats + cargo",
    insuranceUntil: "2027-02-11",
    fitnessUntil: "2027-01-20",
    lastService: "2026-08-16",
    x: 420,
    y: 486,
    speed: 0,
    ping: "Parked",
  },
  {
    id: "VH-05",
    reg: "KA 51 RT 9034",
    model: "Tata Intra V30",
    type: "Light commercial",
    year: 2024,
    fuelType: "Diesel",
    status: "Maintenance",
    driverId: null,
    location: "Peenya Service Bay",
    depot: "Peenya Workshop",
    odometer: 22150,
    capacity: "1,000 kg",
    insuranceUntil: "2027-11-01",
    fitnessUntil: "2027-09-14",
    lastService: "2026-11-24",
    x: 214,
    y: 196,
    speed: 0,
    ping: "Workshop",
  },
  {
    id: "VH-06",
    reg: "KA 04 LK 5567",
    model: "Mahindra Supro",
    type: "Van",
    year: 2022,
    fuelType: "Diesel",
    status: "Active",
    driverId: "DR-04",
    location: "Indiranagar",
    depot: "Indiranagar",
    odometer: 54610,
    capacity: "850 kg",
    insuranceUntil: "2027-05-22",
    fitnessUntil: "2027-03-09",
    lastService: "2026-10-03",
    x: 672,
    y: 292,
    speed: 0,
    ping: "4 min ago",
  },
  {
    id: "VH-07",
    reg: "KA 01 CD 3402",
    model: "Force Traveller 26",
    type: "Staff bus",
    year: 2019,
    fuelType: "Diesel",
    status: "On trip",
    driverId: "DR-05",
    location: "Manyata Tech Park",
    depot: "Hebbal Yard",
    odometer: 148900,
    capacity: "26 seats",
    insuranceUntil: "2027-01-28",
    fitnessUntil: "2026-12-18",
    lastService: "2026-09-11",
    x: 602,
    y: 102,
    speed: 18,
    ping: "2 min ago",
  },
  {
    id: "VH-08",
    reg: "KA 53 AB 8812",
    model: "Tata 407",
    type: "Truck",
    year: 2018,
    fuelType: "Diesel",
    status: "Active",
    driverId: "DR-06",
    location: "Peenya Industrial Area",
    depot: "Peenya",
    odometer: 206440,
    capacity: "2,500 kg",
    insuranceUntil: "2027-04-06",
    fitnessUntil: "2027-02-17",
    lastService: "2026-10-21",
    x: 176,
    y: 238,
    speed: 0,
    ping: "8 min ago",
  },
  {
    id: "VH-09",
    reg: "KA 02 YZ 6710",
    model: "Ashok Leyland Partner",
    type: "Light commercial",
    year: 2021,
    fuelType: "Diesel",
    status: "Idle",
    driverId: null,
    location: "Banashankari Depot",
    depot: "Banashankari Depot",
    odometer: 77015,
    capacity: "1,000 kg",
    insuranceUntil: "2027-07-14",
    fitnessUntil: "2026-12-02",
    lastService: "2026-07-30",
    x: 308,
    y: 548,
    speed: 0,
    ping: "Parked",
  },
  {
    id: "VH-10",
    reg: "KA 05 WM 2098",
    model: "Mahindra Jeeto",
    type: "Mini truck",
    year: 2023,
    fuelType: "CNG",
    status: "Active",
    driverId: "DR-07",
    location: "HSR Layout",
    depot: "HSR Layout",
    odometer: 33280,
    capacity: "600 kg",
    insuranceUntil: "2027-09-03",
    fitnessUntil: "2027-06-25",
    lastService: "2026-10-29",
    x: 618,
    y: 512,
    speed: 0,
    ping: "5 min ago",
  },
  {
    id: "VH-11",
    reg: "KA 03 NP 4419",
    model: "Tata Yodha Pickup",
    type: "Pickup",
    year: 2024,
    fuelType: "Diesel",
    status: "On trip",
    driverId: "DR-08",
    location: "Bellandur",
    depot: "Whitefield Depot",
    odometer: 18640,
    capacity: "1,200 kg",
    insuranceUntil: "2027-12-09",
    fitnessUntil: "2027-10-01",
    lastService: "2026-11-08",
    x: 748,
    y: 402,
    speed: 29,
    ping: "Just now",
  },
  {
    id: "VH-12",
    reg: "KA 01 HS 7750",
    model: "Maruti Suzuki Super Carry",
    type: "Mini truck",
    year: 2022,
    fuelType: "CNG",
    status: "Active",
    driverId: "DR-09",
    location: "Rajajinagar",
    depot: "Rajajinagar",
    odometer: 49775,
    capacity: "625 kg",
    insuranceUntil: "2027-03-27",
    fitnessUntil: "2027-02-02",
    lastService: "2026-09-19",
    x: 278,
    y: 324,
    speed: 0,
    ping: "11 min ago",
  },
];

export const drivers = [
  {
    id: "DR-01",
    name: "Ramesh Gowda",
    phone: "+91 98450 22118",
    license: "KA01 20160033419",
    licenseExpiry: "2028-08-14",
    status: "On duty",
    hub: "Whitefield",
    experience: "9 years",
    joined: "Mar 2017",
    vehicleId: "VH-01",
  },
  {
    id: "DR-02",
    name: "Suresh Kumar",
    phone: "+91 98860 11452",
    license: "KA03 20150090821",
    licenseExpiry: "2027-11-30",
    status: "On duty",
    hub: "Hebbal",
    experience: "11 years",
    joined: "Jun 2015",
    vehicleId: "VH-02",
  },
  {
    id: "DR-03",
    name: "Mohammed Irfan",
    phone: "+91 99001 88342",
    license: "KA05 20190044128",
    licenseExpiry: "2029-04-02",
    status: "On duty",
    hub: "Electronic City",
    experience: "7 years",
    joined: "Feb 2019",
    vehicleId: "VH-03",
  },
  {
    id: "DR-04",
    name: "Priya Nair",
    phone: "+91 97311 56028",
    license: "KA04 20180022761",
    licenseExpiry: "2028-12-11",
    status: "On duty",
    hub: "Indiranagar",
    experience: "8 years",
    joined: "Aug 2018",
    vehicleId: "VH-06",
  },
  {
    id: "DR-05",
    name: "Karthik Shetty",
    phone: "+91 98451 77209",
    license: "KA01 20120011883",
    licenseExpiry: "2027-06-19",
    status: "On duty",
    hub: "Hebbal",
    experience: "14 years",
    joined: "Jan 2012",
    vehicleId: "VH-07",
  },
  {
    id: "DR-06",
    name: "Lakshmi Devi",
    phone: "+91 99645 33017",
    license: "KA53 20140055290",
    licenseExpiry: "2028-02-28",
    status: "On duty",
    hub: "Peenya",
    experience: "12 years",
    joined: "May 2014",
    vehicleId: "VH-08",
  },
  {
    id: "DR-07",
    name: "Arjun Reddy",
    phone: "+91 97400 66123",
    license: "KA05 20200031844",
    licenseExpiry: "2030-09-07",
    status: "On duty",
    hub: "HSR Layout",
    experience: "5 years",
    joined: "Sep 2021",
    vehicleId: "VH-10",
  },
  {
    id: "DR-08",
    name: "Divya Prasad",
    phone: "+91 98802 44761",
    license: "KA03 20190077420",
    licenseExpiry: "2029-03-15",
    status: "On duty",
    hub: "Whitefield",
    experience: "6 years",
    joined: "Nov 2019",
    vehicleId: "VH-11",
  },
  {
    id: "DR-09",
    name: "Imran Pasha",
    phone: "+91 99164 22870",
    license: "KA01 20170066513",
    licenseExpiry: "2028-07-22",
    status: "On duty",
    hub: "Rajajinagar",
    experience: "8 years",
    joined: "Apr 2018",
    vehicleId: "VH-12",
  },
  {
    id: "DR-10",
    name: "Kavitha Rao",
    phone: "+91 97418 22031",
    license: "KA05 20210077812",
    licenseExpiry: "2029-01-19",
    status: "Off duty",
    hub: "Jayanagar Depot",
    experience: "6 years",
    joined: "Jan 2021",
    vehicleId: null,
  },
];

export const trips = [
  { id: "TR-90418", date: "2026-11-25", vehicleId: "VH-01", driverId: "DR-01", pickup: "Whitefield, ITPL Main Road", drop: "Electronic City Phase 1, Hosur Road", km: 28.4, status: "In progress", start: "08:10", end: null },
  { id: "TR-90422", date: "2026-11-25", vehicleId: "VH-03", driverId: "DR-03", pickup: "Peenya 2nd Stage", drop: "Koramangala 4th Block", km: 18.6, status: "In progress", start: "09:05", end: null },
  { id: "TR-90430", date: "2026-11-25", vehicleId: "VH-07", driverId: "DR-05", pickup: "Hebbal Flyover", drop: "Manyata Tech Park", km: 6.2, status: "In progress", start: "07:40", end: null },
  { id: "TR-90433", date: "2026-11-25", vehicleId: "VH-11", driverId: "DR-08", pickup: "KR Puram", drop: "Bellandur", km: 11.8, status: "In progress", start: "10:15", end: null },
  { id: "TR-90411", date: "2026-11-25", vehicleId: "VH-02", driverId: "DR-02", pickup: "Yeshwanthpur", drop: "Majestic Bus Stand", km: 7.4, status: "Completed", start: "06:20", end: "07:05" },
  { id: "TR-90414", date: "2026-11-25", vehicleId: "VH-06", driverId: "DR-04", pickup: "Indiranagar 100 Feet Road", drop: "MG Road", km: 4.1, status: "Completed", start: "08:00", end: "08:28" },
  { id: "TR-90416", date: "2026-11-25", vehicleId: "VH-10", driverId: "DR-07", pickup: "HSR Layout, BDA Complex", drop: "Silk Board", km: 3.6, status: "Completed", start: "09:30", end: "09:48" },
  { id: "TR-90408", date: "2026-11-25", vehicleId: "VH-08", driverId: "DR-06", pickup: "Peenya Industrial Area", drop: "Yeshwanthpur Railway Station", km: 8.9, status: "Completed", start: "05:50", end: "06:40" },
  { id: "TR-90380", date: "2026-11-24", vehicleId: "VH-01", driverId: "DR-01", pickup: "Whitefield Depot", drop: "Jayanagar 4th Block", km: 22.1, status: "Completed", start: "11:10", end: "12:05" },
  { id: "TR-90371", date: "2026-11-24", vehicleId: "VH-12", driverId: "DR-09", pickup: "Rajajinagar", drop: "Malleshwaram 18th Cross", km: 5.5, status: "Completed", start: "14:20", end: "14:48" },
  { id: "TR-90355", date: "2026-11-24", vehicleId: "VH-02", driverId: "DR-02", pickup: "Hebbal", drop: "Yelahanka New Town", km: 12.4, status: "Completed", start: "16:00", end: "16:42" },
  { id: "TR-90302", date: "2026-11-23", vehicleId: "VH-03", driverId: "DR-03", pickup: "Electronic City Phase 1", drop: "BTM Layout", km: 14.2, status: "Completed", start: "13:15", end: "14:02" },
  { id: "TR-90288", date: "2026-11-23", vehicleId: "VH-06", driverId: "DR-04", pickup: "Indiranagar", drop: "KR Puram", km: 9.7, status: "Completed", start: "15:40", end: "16:18" },
  { id: "TR-90240", date: "2026-11-22", vehicleId: "VH-08", driverId: "DR-06", pickup: "Peenya", drop: "Nelamangala", km: 19.5, status: "Completed", start: "10:05", end: "11:00" },
  { id: "TR-90190", date: "2026-11-20", vehicleId: "VH-07", driverId: "DR-05", pickup: "Hebbal", drop: "Electronic City", km: 31.2, status: "Completed", start: "08:30", end: "09:55" },
  { id: "TR-90110", date: "2026-11-18", vehicleId: "VH-10", driverId: "DR-07", pickup: "HSR Layout", drop: "Jayanagar 4th Block", km: 8.3, status: "Completed", start: "17:10", end: "17:42" },
];

export const fuelRecords = [
  { id: "FL-1901", date: "2026-11-19", vehicleId: "VH-08", driverId: "DR-06", station: "IndianOil, Peenya", qty: 55, unit: "L", rate: 94.3, amount: 5187, odometer: 205980 },
  { id: "FL-1902", date: "2026-11-19", vehicleId: "VH-10", driverId: "DR-07", station: "IGL CNG, BTM Layout", qty: 23.1, unit: "kg", rate: 90, amount: 2079, odometer: 33110 },
  { id: "FL-2001", date: "2026-11-20", vehicleId: "VH-07", driverId: "DR-05", station: "BPCL, Hebbal", qty: 70, unit: "L", rate: 94.2, amount: 6594, odometer: 148420 },
  { id: "FL-2002", date: "2026-11-20", vehicleId: "VH-12", driverId: "DR-09", station: "IGL CNG, Rajajinagar", qty: 17, unit: "kg", rate: 90.1, amount: 1532, odometer: 49440 },
  { id: "FL-2101", date: "2026-11-21", vehicleId: "VH-03", driverId: "DR-03", station: "Shell, Hosur Road", qty: 42, unit: "L", rate: 94.8, amount: 3982, odometer: 41640 },
  { id: "FL-2102", date: "2026-11-21", vehicleId: "VH-06", driverId: "DR-04", station: "IndianOil, Domlur", qty: 26.4, unit: "L", rate: 94.7, amount: 2500, odometer: 54380 },
  { id: "FL-2201", date: "2026-11-22", vehicleId: "VH-01", driverId: "DR-01", station: "IndianOil, Marathahalli", qty: 34, unit: "L", rate: 95, amount: 3230, odometer: 68110 },
  { id: "FL-2202", date: "2026-11-22", vehicleId: "VH-02", driverId: "DR-02", station: "HPCL, Yeshwanthpur", qty: 38.5, unit: "L", rate: 94.6, amount: 3642, odometer: 90880 },
  { id: "FL-2301", date: "2026-11-23", vehicleId: "VH-11", driverId: "DR-08", station: "Nayara, KR Puram", qty: 30, unit: "L", rate: 94.9, amount: 2847, odometer: 18420 },
  { id: "FL-2302", date: "2026-11-23", vehicleId: "VH-04", driverId: "DR-10", station: "IGL CNG, Jayanagar", qty: 16.5, unit: "kg", rate: 90, amount: 1485, odometer: 112340 },
  { id: "FL-2303", date: "2026-11-23", vehicleId: "VH-08", driverId: "DR-06", station: "BPCL, Peenya", qty: 48, unit: "L", rate: 94.4, amount: 4531, odometer: 206110 },
  { id: "FL-2401", date: "2026-11-24", vehicleId: "VH-01", driverId: "DR-01", station: "Shell, Whitefield", qty: 32.5, unit: "L", rate: 95.1, amount: 3091, odometer: 68340 },
  { id: "FL-2402", date: "2026-11-24", vehicleId: "VH-03", driverId: "DR-03", station: "IndianOil, Electronic City", qty: 40, unit: "L", rate: 94.7, amount: 3788, odometer: 41880 },
  { id: "FL-2403", date: "2026-11-24", vehicleId: "VH-07", driverId: "DR-05", station: "HPCL, Hebbal", qty: 68, unit: "L", rate: 94.5, amount: 6426, odometer: 148760 },
  { id: "FL-2404", date: "2026-11-24", vehicleId: "VH-10", driverId: "DR-07", station: "IGL CNG, HSR Layout", qty: 14.2, unit: "kg", rate: 89.8, amount: 1275, odometer: 33240 },
  { id: "FL-2501", date: "2026-11-25", vehicleId: "VH-02", driverId: "DR-02", station: "IndianOil, Hebbal", qty: 36.2, unit: "L", rate: 94.8, amount: 3432, odometer: 91220 },
  { id: "FL-2502", date: "2026-11-25", vehicleId: "VH-06", driverId: "DR-04", station: "HPCL, Indiranagar", qty: 28, unit: "L", rate: 94.6, amount: 2649, odometer: 54610 },
  { id: "FL-2503", date: "2026-11-25", vehicleId: "VH-12", driverId: "DR-09", station: "IGL CNG, Rajajinagar", qty: 18.4, unit: "kg", rate: 90.2, amount: 1660, odometer: 49775 },
  { id: "FL-2504", date: "2026-11-25", vehicleId: "VH-08", driverId: "DR-06", station: "BPCL, Peenya", qty: 52, unit: "L", rate: 94.4, amount: 4910, odometer: 206440 },
];

const earlierWeeks = [
  { label: "1–7 Nov", fills: 48, amount: 152480 },
  { label: "8–14 Nov", fills: 45, amount: 146220 },
  { label: "15–21 Nov", fills: 43, amount: 144584 },
];

const weekToDateRecords = fuelRecords.filter((record) => record.date >= "2026-11-22");

export const FUEL_WEEKS = [
  ...earlierWeeks,
  {
    label: "22–25 Nov",
    fills: weekToDateRecords.length,
    amount: weekToDateRecords.reduce((sum, record) => sum + record.amount, 0),
  },
];

export const MONTH_FUEL_TOTAL = FUEL_WEEKS.reduce((sum, week) => sum + week.amount, 0);

export const CHART_DAYS = [
  "2026-11-19",
  "2026-11-20",
  "2026-11-21",
  "2026-11-22",
  "2026-11-23",
  "2026-11-24",
  "2026-11-25",
];

export const REPORTS = {
  daily: {
    id: "daily",
    label: "Daily",
    title: "Daily fleet report",
    range: "25 November 2026",
    start: TODAY,
    end: TODAY,
    ref: "LH-DL-251125",
  },
  weekly: {
    id: "weekly",
    label: "Weekly",
    title: "Weekly fleet report",
    range: "23–25 November 2026",
    start: "2026-11-23",
    end: TODAY,
    ref: "LH-WK-251125",
  },
  monthly: {
    id: "monthly",
    label: "Monthly",
    title: "Monthly fleet report",
    range: "1–25 November 2026",
    start: "2026-11-01",
    end: TODAY,
    ref: "LH-MN-251125",
  },
};

export function getVehicle(id) {
  return vehicles.find((vehicle) => vehicle.id === id) ?? null;
}

export function getDriver(id) {
  return drivers.find((driver) => driver.id === id) ?? null;
}

export function driverName(id) {
  return getDriver(id)?.name ?? "Unassigned";
}

export function vehicleReg(id) {
  return getVehicle(id)?.reg ?? "—";
}

export function compareTrips(a, b) {
  if (a.date !== b.date) return b.date.localeCompare(a.date);
  return b.start.localeCompare(a.start);
}

export function tripsForVehicle(id) {
  return trips.filter((trip) => trip.vehicleId === id).sort(compareTrips);
}

export function tripsForDriver(id) {
  return trips.filter((trip) => trip.driverId === id).sort(compareTrips);
}

export function fuelForVehicle(id) {
  return fuelRecords
    .filter((record) => record.vehicleId === id)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function fuelByDay() {
  return CHART_DAYS.map((date) => ({
    label: date.slice(-2),
    value: fuelRecords
      .filter((record) => record.date === date)
      .reduce((sum, record) => sum + record.amount, 0),
    today: date === TODAY,
  }));
}

export function tripsByDay() {
  return CHART_DAYS.map((date) => ({
    label: date.slice(-2),
    value: trips.filter((trip) => trip.date === date).length,
    today: date === TODAY,
  }));
}

export function fleetAlerts() {
  const items = [];
  for (const vehicle of vehicles) {
    if (vehicle.status === "Maintenance") {
      items.push({
        id: `${vehicle.id}-shop`,
        vehicleId: vehicle.id,
        title: `${vehicle.reg} is in the workshop`,
        body: `${vehicle.model} · ${vehicle.location}`,
      });
    }
    if (vehicle.fitnessUntil <= "2026-12-07") {
      items.push({
        id: `${vehicle.id}-fit`,
        vehicleId: vehicle.id,
        title: "Fitness certificate expiring",
        body: `${vehicle.reg} · valid till ${formatDate(vehicle.fitnessUntil)}`,
      });
    }
  }
  return items;
}

export function buildReport(period) {
  const meta = REPORTS[period];
  const tripRows = trips
    .filter((trip) => trip.date >= meta.start && trip.date <= meta.end)
    .sort(compareTrips);
  const fuelRows = fuelRecords
    .filter((record) => record.date >= meta.start && record.date <= meta.end)
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  const itemisedFuel = fuelRows.reduce((sum, record) => sum + record.amount, 0);
  return {
    ...meta,
    tripRows,
    fuelRows,
    itemisedFuel,
    fuelTotal: period === "monthly" ? MONTH_FUEL_TOTAL : itemisedFuel,
    distance: tripRows.reduce((sum, trip) => sum + trip.km, 0),
  };
}

export const tripsToday = trips.filter((trip) => trip.date === TODAY);
export const activeVehicles = vehicles.filter(
  (vehicle) => vehicle.status === "On trip" || vehicle.status === "Active",
);
