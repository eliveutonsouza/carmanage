"use client";

import { Button } from "@/components/ui/button";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { z } from "zod";

const addCarSchema = z.object({
  plate: z.string().min(7).max(7),
  surname: z.string().min(1).max(100),
  // maintenance: z.array(
  //   z.object({
  //     nameMaintenance: z.string().min(1).max(100),
  //     dateMaintenance: z.date(),
  //   })
  // ),
});

type AddCarFormData = z.infer<typeof addCarSchema>;

export function AddCar() {
  const formAddCar = useForm<AddCarFormData>({
    resolver: zodResolver(addCarSchema),
    defaultValues: {
      plate: "",
      surname: "",
      // maintenance: [
      //   {
      //     nameMaintenance: "",
      //     dateMaintenance: new Date(),
      //   },
      // ],
    },
  });

  const handleSubmit = (data: AddCarFormData) => {
    console.log(data);
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

          <Form {...formAddCar}>
            <form action="" onSubmit={formAddCar.handleSubmit(handleSubmit)}>
              <FormField
                control={formAddCar.control}
                name="plate"
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Placa</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: AAA-1234"
                        className="uppercase"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormControl>
                )}
              />

              <FormField
                name="surname"
                control={formAddCar.control}
                render={({ field }) => (
                  <FormControl>
                    <FormLabel>Nome do Veiculo</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ex: Gol"
                        className="uppercase"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormControl>
                )}
              />
            </form>
          </Form>

          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
