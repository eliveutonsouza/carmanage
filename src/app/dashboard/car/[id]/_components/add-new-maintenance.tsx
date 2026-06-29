"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon, LoaderCircle, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AddMaintenanceFormData,
  addMaintenanceSchema,
} from "@/schemas/add-maintenance-schema";
import postNewMaintenance from "@/actions/maintenance/post-new-maintenance";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type AddNewMaintenanceProps = {
  idCar: string;
};

export function AddNewMaintenance({ idCar }: AddNewMaintenanceProps) {
  const { toast } = useToast();
  const router = useRouter();

  const formAddMaintenance = useForm<AddMaintenanceFormData>({
    resolver: zodResolver(addMaintenanceSchema),
    defaultValues: {
      nameMaintenance: "",
      type: "PREVENTIVA",
      lastDateMaintenance: new Date(),
      nextDateMaintenance: new Date(),
      cost: "",
      provider: "",
      notes: "",
    },
  });

  const onSubmit = formAddMaintenance.handleSubmit(async (data) => {
    await postNewMaintenance(data, idCar);

    toast({
      title: "Sucesso 🎉",
      description: "Manutenção adicionada com sucesso.",
    });

    formAddMaintenance.reset();
    router.refresh();
  });

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="flex gap-1">
          <Plus size={16} />
          Adicionar Manutenção
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              Adicionar nova manutenção
            </DrawerTitle>
            <DrawerDescription className="text-center">
              Preencha os dados da manutenção do veículo.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <Form {...formAddMaintenance}>
              <form
                id="formAddCar"
                onSubmit={onSubmit}
                className="flex flex-col gap-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    name="nameMaintenance"
                    control={formAddMaintenance.control}
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Nome da manutenção</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Troca de óleo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="type"
                    control={formAddMaintenance.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PREVENTIVA">Preventiva</SelectItem>
                            <SelectItem value="CORRETIVA">Corretiva</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="cost"
                    control={formAddMaintenance.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custo (R$)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0,00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="lastDateMaintenance"
                    control={formAddMaintenance.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Última manutenção</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "dd/MM/yyyy") : "Selecionar"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-background border rounded shadow-md z-50">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="nextDateMaintenance"
                    control={formAddMaintenance.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Próxima manutenção</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "dd/MM/yyyy") : "Selecionar"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-background border rounded shadow-md z-50">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="provider"
                    control={formAddMaintenance.control}
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Fornecedor / Oficina (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Auto Mecânica Silva" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="notes"
                    control={formAddMaintenance.control}
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Observações (opcional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Detalhes adicionais..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </div>

          <DrawerFooter>
            {formAddMaintenance.formState.isSubmitting ? (
              <Button type="submit" disabled className="flex gap-2">
                <LoaderCircle className="animate-spin" />
                Salvando...
              </Button>
            ) : (
              <Button form="formAddCar" type="submit" className="w-full">
                Salvar manutenção
              </Button>
            )}
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
