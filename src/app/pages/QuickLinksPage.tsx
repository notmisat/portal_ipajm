import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { QuickLinkCard } from '../components/QuickLinkCard';
import { quickLinks } from '../data/mockData';
import { filterByProfile } from '../utils/helpers';
import { ExternalLink, Link as LinkIcon } from 'lucide-react';

export function QuickLinksPage() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  const userLinks = filterByProfile(quickLinks, currentUser);
  
  // Separate internal and external links
  const internalLinks = userLinks.filter(link => !link.external);
  const externalLinks = userLinks.filter(link => link.external);

  const profileLabels = {
    admin: 'Administrador',
    rh: 'Recursos Humanos',
    servidor: 'Servidor',
    gestor: 'Gestor',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Acesso Rápido</h1>
        <p className="text-muted-foreground">
          Links e ferramentas personalizados para seu perfil e setor
        </p>
        <div className="flex gap-2 mt-4">
          <Badge variant="secondary">
            {profileLabels[currentUser.profile]}
          </Badge>
          <Badge variant="secondary">
            {currentUser.sector}
          </Badge>
        </div>
      </div>

      {/* External Links Section */}
      {externalLinks.length > 0 && (
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ExternalLink className="size-5 text-primary" />
                <CardTitle>Sistemas Externos</CardTitle>
              </div>
              <CardDescription>
                Acesso rápido aos sistemas e portais do governo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {externalLinks.map((link) => (
                  <QuickLinkCard key={link.id} link={link} />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Internal Links Section */}
      {internalLinks.length > 0 && (
        <section>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <LinkIcon className="size-5 text-primary" />
                <CardTitle>Ferramentas Internas</CardTitle>
              </div>
              <CardDescription>
                Acesso às funcionalidades do portal IPAJM-ES
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {internalLinks.map((link) => (
                  <QuickLinkCard key={link.id} link={link} />
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Info Card */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Dica:</strong> Os links exibidos são personalizados de acordo com seu perfil ({profileLabels[currentUser.profile]}) 
            e setor ({currentUser.sector}). Caso precise de acesso a outros sistemas, entre em contato com o suporte.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
