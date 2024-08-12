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
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import {
  EditExistingCarFormData,
  EditExistingCarFormSchema,
} from "@/schemas/edit-existing-car-form-schema";
import { CarTypes } from "@/@types/car-types";
import putCarExisting from "@/actions/cars/put-car-exist";
import { useToast } from "@/components/ui/use-toast";

export function EditExistingCarForm(dataInputs: CarTypes) {
  const router = useRouter();
  const { toast } = useToast();

  const existingCarForm = useForm<EditExistingCarFormData>({
    resolver: zodResolver(EditExistingCarFormSchema),
    defaultValues: {
      plate: dataInputs.plate,
      surname: dataInputs.name,
      id: dataInputs.id,
    },
  });

  const onSubmit = existingCarForm.handleSubmit(async (data) => {
    await putCarExisting(data);

    toast({
      title: "Sucesso",
      description: "Veículo editado com sucesso.",
    });

    router.refresh();
  });

  return (
    <Drawer>
      <DrawerTrigger className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer">
        Editar veículo
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-center">
              Edite um veículo existente
            </DrawerTitle>
            <DrawerDescription className="text-center">
              Atualize os dados do veículo para manter suas informações em dia.
            </DrawerDescription>
          </DrawerHeader>
          <div>
            <Form {...existingCarForm}>
              <form
                id="formAddCar"
                onSubmit={onSubmit}
                className="flex flex-col gap-4"
              >
                <FormField
                  name="plate"
                  control={existingCarForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Placa do veículo</FormLabel>
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
                  control={existingCarForm.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Veículo</FormLabel>
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
              Salvar alterações
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
