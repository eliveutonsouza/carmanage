import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import db from "@/lib/db";
import { cn } from "@/lib/utils";
import { AreaChart, Car, CheckCircle, Home, Key, Wrench } from "lucide-react";
import { AddCar } from "../_components/add-car";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const mockMenu = [
  {
    id: 1,
    label: "Home",
    href: "/dashboard",
    icon: <Home size={16} />,
  },

  {
    id: 2,
    label: "Análises",
    href: "/dashboard",
    icon: <AreaChart size={16} />,
  },
];

const mockCardsDashboard = [
  {
    id: 1,
    title: "Total de Veículos",
    icon: <Car size={16} />,
    value: 204,
    footer: "+10% do ultimo mês",
  },

  {
    id: 2,
    title: "Veículos em Manutenção",
    icon: <Wrench size={16} />,
    value: 15,
    footer: "+5% do ultimo mês",
  },
  {
    id: 3,
    title: "Veículos Disponíveis",
    icon: <CheckCircle size={16} />,
    value: 180,
    footer: "+8% do ultimo mês",
  },

  {
    id: 4,
    title: "Veículos a vencer Manutençes",
    icon: <Key size={16} />,
    value: 30,
    footer: "+7% do ultimo mês",
  },
];

export default async function Dashboard() {
  const session = await auth();

  const user = await db.user.findUnique({
    where: { email: session?.user?.email ?? "" },
  });

  return (
    <>
      <main>
        <section className="border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <AddCar />
        </section>
        <section className=" p-4 h-full flex flex-col gap-4">
          <div className="flex gap-4 items-center justify-center">
            {mockCardsDashboard.map((card) => (
              <Card key={card.id} className={cn("w-[20rem] bg-current")}>
                <CardHeader
                  className={"text-white flex flex-row justify-between "}
                >
                  <CardTitle className="text-base">{card.title}</CardTitle>
                  <CardDescription>{card.icon}</CardDescription>
                </CardHeader>
                <CardContent className="text-white flex ">
                  <span className="text-4xl font-bold">{card.value}</span>
                </CardContent>
                <CardFooter className="text-white">{card.footer}</CardFooter>
              </Card>
            ))}
          </div>

          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </section>
      </main>
    </>
  );
}
