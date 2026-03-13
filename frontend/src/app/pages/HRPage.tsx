import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockHRHighlights } from '../../data/mockData';
import { formatDate } from '../../utils/helpers';
import { 
  Heart, 
  Briefcase, 
  GraduationCap, 
  TrendingUp,
  Calendar,
  Users,
  Award,
  Gift,
  ArrowRight
} from 'lucide-react';

export function HRPage() {
  const benefits = [
    { icon: Gift, title: 'Vale Alimentação', description: 'R$ 800,00 mensais em cartão alimentação' },
    { icon: Heart, title: 'Plano de Saúde', description: 'Cobertura nacional com coparticipação' },
    { icon: Calendar, title: 'Vale Transporte', description: 'Custeio de deslocamento casa-trabalho' },
    { icon: Users, title: 'Auxílio Creche', description: 'Até R$ 500,00 para filhos até 6 anos' },
  ];

  const stats = [
    { label: 'Benefícios Ativos', value: '12', icon: Gift },
    { label: 'Convênios', value: '45+', icon: Award },
    { label: 'Cursos Oferecidos', value: '28', icon: GraduationCap },
    { label: 'Servidores', value: '850+', icon: Users },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-lg bg-linear-to-br from-pink-600 to-rose-800 text-white p-8">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="size-6" />
            <span className="text-sm font-medium opacity-90">
              Recursos Humanos
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Cuidando de Quem Cuida
          </h1>
          <p className="text-pink-100 max-w-2xl">
            Conheça os benefícios, programas e oportunidades disponíveis para você e sua família
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6 text-center">
                <Icon className="size-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* HR Highlights */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Destaques e Novidades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockHRHighlights.map((highlight) => (
            <Card key={highlight.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <Badge variant={
                    highlight.type === 'vacancy' ? 'default' :
                    highlight.type === 'training' ? 'secondary' : 'outline'
                  }>
                    {highlight.type === 'benefit' && 'Benefício'}
                    {highlight.type === 'vacancy' && 'Vaga'}
                    {highlight.type === 'training' && 'Treinamento'}
                    {highlight.type === 'news' && 'Novidade'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(highlight.date)}
                  </span>
                </div>
                <CardTitle className="text-lg mt-2">{highlight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {highlight.description}
                </p>
                {highlight.link && (
                  <Button variant="outline" size="sm" className="w-full">
                    Saiba mais
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Overview dos Benefícios */}
      <div>
        <h2 className="text-2x font-bold mb-6">Principais Benefícios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="h-full">
                <CardHeader className="h-full">
                  <div className="flex items-center gap-4 justify-center">
                    <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">{benefit.title}</CardTitle>
                      <CardDescription>{benefit.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Programas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <Briefcase className="size-10 text-blue-600 mb-3" />
            <CardTitle>Programa de Desenvolvimento</CardTitle>
            <CardDescription>
              Trilhas de carreira e capacitação profissional contínua
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Explorar programas
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <Heart className="size-10 text-green-600 mb-3" />
            <CardTitle>Qualidade de Vida</CardTitle>
            <CardDescription>
              Ginástica laboral, acompanhamento psicológico e nutricional
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Participar
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <TrendingUp className="size-10 text-purple-600 mb-3" />
            <CardTitle>Progressão de Carreira</CardTitle>
            <CardDescription>
              Informações sobre plano de cargos e oportunidades internas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              Ver detalhes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Contatos */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Entre em Contato com o RH</CardTitle>
          <CardDescription>
            Nossa equipe está à disposição para esclarecer dúvidas e fornecer suporte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">
            <strong>Email:</strong> rh@ipajm.es.gov.br
          </p>
          <p className="text-sm">
            <strong>Telefone:</strong> (27) 3636-4247 - Ramal 200
          </p>
          <p className="text-sm">
            <strong>Horário:</strong> Segunda a Sexta, 8h às 18h
          </p>
          <p className="text-sm">
            <strong>Local:</strong> 2º andar - Departamento de Recursos Humanos
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
