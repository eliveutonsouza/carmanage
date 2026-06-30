import getLoggedInUser from "@/actions/user/get-logged-in-user";
import { ProfileForm } from "./_components/profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SettingsPage() {
  const user = await getLoggedInUser();

  return (
    <main>
      <section className="border-b border-border p-4">
        <h2 className="text-xl font-semibold">Configurações</h2>
        <p className="text-sm text-muted-foreground">Gerencie as informações da sua conta.</p>
      </section>

      <section className="p-4 max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Atualize seu nome e informações pessoais.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm name={user?.name ?? ""} email={user?.email ?? ""} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conta</CardTitle>
            <CardDescription>Informações da sua conta.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">E-mail</p>
              <p className="text-sm">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Membro desde</p>
              <p className="text-sm">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
