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
import { CalendarIcon, Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { AddCarFormData, addCarSchema } from "@/schemas/add-car-schema";
import postNewCarMaintenance from "@/actions/api/post-new-car-maintenance";

export function AddCar() {
  const formAddCar = useForm<AddCarFormData>({
    resolver: zodResolver(addCarSchema),
    defaultValues: {
      plate: "",
      surname: "",
      maintenance: [
        {
          nameMaintenance: "",
          lastDateMaintenance: new Date(),
          nextDateMaintenance: new Date(),
        },
      ],
    },
  });

  const handleSubmit = (data: AddCarFormData) => {
    console.log("Cliente:", data);
    postNewCarMaintenance(data);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default">
          <Plus size={16} />
          Adicionar Veiculo
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Adicione um veiculo</DrawerTitle>
            <DrawerDescription>
              Adicione um veiculo para realizar a gestão de suas manutenções.
            </DrawerDescription>
          </DrawerHeader>
          <div>
            <Form {...formAddCar}>
              <form
                id="formAddCar"
                onSubmit={formAddCar.handleSubmit(handleSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  name="plate"
                  control={formAddCar.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Placa do veiculo</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Ex: AAA-1234"
                          className="uppercase"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="surname"
                  control={formAddCar.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Veiculo</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Ex: Gol" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name={`maintenance.${0}.nameMaintenance`}
                  control={formAddCar.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da manutenção</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Ex: Troca de oleo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-4">
                  <FormField
                    name={`maintenance.${0}.lastDateMaintenance`}
                    control={formAddCar.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ultima manutenção</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                className="bg-white shadow rounded"
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
                    name={`maintenance.${0}.nextDateMaintenance`}
                    control={formAddCar.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Proxima manutenção</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                className="bg-white shadow rounded"
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
                </div>
              </form>
            </Form>
          </div>

          <DrawerFooter>
            <Button
              form="formAddCar"
              type="submit"
              variant="default"
              className="mt-4"
            >
              Salvar
            </Button>

            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
