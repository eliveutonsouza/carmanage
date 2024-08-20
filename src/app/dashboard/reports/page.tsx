import { Button } from "@/components/ui/button";

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
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { ButtonSendMail } from "./_components/button-send-mail";
import { MailPlus } from "lucide-react";

export default async function ReportPage() {
  return (
    <main>
      <section className="border-b border-gray-200 p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Relatórios</h2>

        <ButtonSendMail>
          <MailPlus size={24} className="mr-2" />
          Receber um novo relatório
        </ButtonSendMail>
      </section>

      <section className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <Tabs defaultValue="history">
          <TabsList className="w-[400px] grid grid-cols-2">
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="config-history">Configurações</TabsTrigger>
          </TabsList>
          <TabsContent className="h-full" value="history">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de relatórios</CardTitle>
                <CardDescription>
                  Visualize o histórico de relatórios enviados para seu e-mail.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
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
                    <TableRow>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="config-history">
            <Card>
              <CardHeader>
                <CardTitle>Configuração de Relatórios</CardTitle>
                <CardDescription>
                  Configure suas preferências de relatórios aqui. Após salvar,
                  você será desconectado.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
