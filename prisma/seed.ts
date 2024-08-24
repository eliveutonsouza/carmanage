import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userId = "cm077yx6p00002jg8698g51g9";

  const carNames = [
    "Ford Mustang",
    "Chevrolet Camaro",
    "Toyota Corolla",
    "Honda Civic",
    "Nissan Altima",
    "Volkswagen Golf",
    "BMW 3 Series",
    "Mercedes-Benz C-Class",
    "Audi A4",
    "Tesla Model S",
    "Jeep Wrangler",
    "Hyundai Elantra",
    "Kia Sorento",
    "Mazda CX-5",
    "Subaru Outback",
    "Chevrolet Silverado",
    "Ram 1500",
    "GMC Sierra",
    "Ford F-150",
    "Toyota Tacoma",
    "Honda CR-V",
    "Nissan Rogue",
    "Ford Explorer",
    "Chevrolet Equinox",
    "Toyota RAV4",
    "Jeep Grand Cherokee",
    "Hyundai Santa Fe",
    "Kia Sportage",
    "Mazda 3",
    "Subaru Impreza",
  ];

  const maintenanceNames = [
    "Troca de Óleo",
    "Troca de Filtro de Ar",
    "Troca de Filtro de Combustível",
    "Troca de Filtro de Cabine",
    "Alinhamento e Balanceamento",
    "Verificação do Sistema de Freios",
    "Substituição de Pastilhas de Freio",
    "Substituição de Discos de Freio",
    "Verificação e Substituição de Velas",
    "Substituição de Bateria",
    "Inspeção do Sistema de Arrefecimento",
    "Troca do Fluído de Transmissão",
    "Verificação do Sistema de Suspensão",
    "Troca de Correia Dentada",
    "Substituição do Radiador",
    "Verificação e Ajuste do Sistema de Direção",
    "Inspeção do Sistema de Escape",
    "Troca de Amortecedores",
    "Limpeza dos Bicos Injetores",
    "Ajuste de Câmbio",
  ];

  const generatedPlates = new Set<string>();

  function generateUniquePlate(): string {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";

    let plate: string;
    do {
      const lettersPart =
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length));
      const middleNumber = numbers.charAt(
        Math.floor(Math.random() * numbers.length)
      );
      const middleChar =
        Math.random() > 0.5
          ? letters.charAt(Math.floor(Math.random() * letters.length))
          : numbers.charAt(Math.floor(Math.random() * numbers.length));
      const endNumbers =
        numbers.charAt(Math.floor(Math.random() * numbers.length)) +
        numbers.charAt(Math.floor(Math.random() * numbers.length));

      plate = `${lettersPart}${middleNumber}${middleChar}${endNumbers}`;
    } while (generatedPlates.has(plate));

    generatedPlates.add(plate);
    return plate;
  }

  function getRandomDate(start: Date, end: Date): Date {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }

  for (let i = 0; i < 30; i++) {
    const lastMaintenance = getRandomDate(
      new Date("2023-01-01"),
      new Date("2023-12-31")
    );
    const nextMaintenance = getRandomDate(
      new Date("2024-01-01"),
      new Date("2024-12-31")
    );

    const status = nextMaintenance < new Date() ? "VENCIDA" : "CONFORME";

    const car = await prisma.car.create({
      data: {
        name: carNames[Math.floor(Math.random() * carNames.length)],
        plate: generateUniquePlate(),
        userId: userId,
        CarMaintenance: {
          create: maintenanceNames.map((name) => ({
            name: name,
            type: Math.random() > 0.5 ? "PREVENTIVA" : "CORRETIVA",
            lastMaintenance: lastMaintenance,
            nextMaintenance: nextMaintenance,
            status: status,
          })),
        },
      },
    });

    console.log(`Carro ${car.name} com placa ${car.plate} criado com sucesso!`);
  }

  console.log("30 carros reais criados com sucesso!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
