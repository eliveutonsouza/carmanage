import {
  Card,
  CardContent,
  CardDescription,
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
import getLoggedInUser from "@/actions/user/get-logged-in-user";
import { ButtonSendMail } from "./_components/button-send-mail";
import { MailPlus } from "lucide-react";
import { FormSettingsReport } from "./_components/form-settings-report";
import { getReportHistory } from "./actions";
import { format } from "date-fns";

export default async function ReportPage() {
  const dataReports = await getReportHistory();
  const userLogged = await getLoggedInUser();

  return (
    <main>
      <section className="border-b border-gray-200 p-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Relatórios</h2>
        <ButtonSendMail>
          <MailPlus size={16} className="mr-2" />
          Receber um novo relatório
        </ButtonSendMail>
      </section>

      <section className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <Tabs defaultValue="history">
          <TabsList className="w-[400px] grid grid-cols-2">
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="config-history">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent className="max-h-screen" value="history">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de relatórios</CardTitle>
                <CardDescription>
                  Visualize o histórico de relatórios enviados para seu e-mail.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Table>
                  <TableCaption>Lista recente de relatórios</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do relatório</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Hora</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataReports?.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">
                          {report.nameReport}
                        </TableCell>
                        <TableCell>
                          {format(report.createdAt, "MM/dd/yyyy")}
                        </TableCell>
                        <TableCell>
                          {format(report.createdAt, "HH:mm:ss")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="config-history">
            <Card>
              <CardHeader>
                <CardTitle>Configuração de Relatórios</CardTitle>
                <CardDescription>
                  Configure suas preferências de relatórios aqui.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <FormSettingsReport
                  preferences={userLogged?.acceptedReportEmails || false}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
