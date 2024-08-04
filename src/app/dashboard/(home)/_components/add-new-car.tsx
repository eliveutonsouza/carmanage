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
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { AddCarFormData, addCarSchema } from "@/schemas/add-car-schema";
import postNewCar from "@/actions/api/post-new-car";

export function AddNewCar() {
  const formAddCar = useForm<AddCarFormData>({
    resolver: zodResolver(addCarSchema),
    defaultValues: {
      plate: "",
      surname: "",
    },
  });

  const handleSubmit = (data: AddCarFormData) => {
    postNewCar(data);
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
            <DrawerTitle className="text-center">
              Adicione um veiculo
            </DrawerTitle>
            <DrawerDescription className="text-center">
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
