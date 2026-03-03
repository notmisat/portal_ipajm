import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from '../components/ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-lg overflow-hidden bg-white flex items-center justify-center border border-green-700">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1596394723541-3555aa6b843a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwc2hpZWxkJTIwZW1ibGVtJTIwZ3JlZW58ZW58MXx8fHwxNzcxOTM5MjI2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="IPAJM-ES Logo"
                  className="size-full object-cover"
                />
              </div>
              <div>
                <div className="font-bold">IPAJM-ES</div>
                <div className="text-xs text-muted-foreground">
                  Portal Inteligente
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Instituto de Previdência dos Servidores do Estado do Espírito Santo
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Links Úteis</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/announcements" className="text-muted-foreground hover:text-foreground transition-colors">
                  Comunicados
                </Link>
              </li>
              <li>
                <Link to="/quick-links" className="text-muted-foreground hover:text-foreground transition-colors">
                  Acesso Rápido
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="size-4" />
                <span>(27) 3636-4247</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4" />
                <span>suporte@ipajm.es.gov.br</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-4 shrink-0 mt-0.5" />
                <span>
                  Avenida Cezar Hilal, nº 1345<br />
                  Santa Lúcia<br />
                  CEP: 29 056-083 - Vitória / ES
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © {currentYear} IPAJM-ES. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}