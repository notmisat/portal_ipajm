import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockDocuments } from '../../data/mockData';
import { filterBySector, searchItems, formatDate } from '../../utils/helpers';
import { Search, Download, FileText, Filter } from 'lucide-react';

export function DocumentsPage() {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!currentUser) return null;

  const userDocuments = filterBySector(mockDocuments, currentUser.sector);

  const filteredDocuments = searchQuery.length >= 2
    ? searchItems(userDocuments, searchQuery)
    : userDocuments;

  const categoryFiltered = selectedCategory === 'all'
    ? filteredDocuments
    : filteredDocuments.filter(doc => doc.category === selectedCategory);

  const categories = [
    { value: 'all', label: 'Todos', count: userDocuments.length },
    ...Array.from(new Set(userDocuments.map(doc => doc.category))).map(category => ({
      value: category,
      label: category,
      count: userDocuments.filter(doc => doc.category === category).length,
    })),
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Documentos</h1>
        <p className="text-muted-foreground">
          Acesse manuais, formulários e documentos importantes
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar documentos..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtrar por categoria:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      {categoryFiltered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryFiltered.map((document) => (
            <Card key={document.id} className="hover:shadow-md transition-shadow flex flex-col h-full">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="size-5 text-primary" />
                  </div>
                  <Badge variant="outline">{document.category}</Badge>
                </div>
                <CardTitle className="text-base mt-3">{document.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {document.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 mt-auto">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(document.uploadDate)}</span>
                  <span>{document.size}</span>
                </div>
                <Button className="w-full" size="sm">
                  <Download className="mr-2 size-4" />
                  Baixar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="size-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              {searchQuery.length >= 2
                ? 'Nenhum documento encontrado para sua busca'
                : 'Nenhum documento disponível'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
