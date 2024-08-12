"use client";
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
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { useRouter } from "next/navigation";
import { EditExistingMaintenanceFormData } from "@/schemas/edit-existing-maintenance-form-schema";
import { EditExistingCarFormSchema } from "@/schemas/edit-existing-maintenance-form-schema";
import putMaintenanceExisting from "@/actions/maintenance/put-maintenance-exist";

export function EditMaintenanceExist(
  dataCarMaintenance: DataCarMaintenanceTypes
) {
  const router = useRouter();

  const formAddCar = useForm<EditExistingMaintenanceFormData>({
    resolver: zodResolver(EditExistingCarFormSchema),
    defaultValues: {
      nameMaintenance: dataCarMaintenance.name,
      lastDateMaintenance: dataCarMaintenance.lastMaintenance,
      nextDateMaintenance: dataCarMaintenance.nextMaintenance,
      id: dataCarMaintenance.id,
    },
  });

  const onSubmit = formAddCar.handleSubmit(async (data) => {
    await putMaintenanceExisting(data);

    router.refresh();
  });

  return (
    <Form {...formAddCar}>
      <form id="formAddCar" onSubmit={onSubmit} className="flex flex-col gap-4">
        <FormField
          name={"nameMaintenance"}
          control={formAddCar.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da manutenção</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Ex: Troca de oleo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <FormField
            name={"lastDateMaintenance"}
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
                          <span>Selecione uma data</span>
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
            name={"nextDateMaintenance"}
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
                          <span>Selecione uma data</span>
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
  );
}
