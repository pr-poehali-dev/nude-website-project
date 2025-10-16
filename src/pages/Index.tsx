import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
}

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  comments: Comment[];
}

const Index = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');
  const [email, setEmail] = useState('');

  const articles: Article[] = [
    {
      id: 1,
      title: 'Будущее веб-дизайна',
      excerpt: 'Исследуем последние тренды в современном веб-дизайне и UX/UI',
      category: 'Дизайн',
      image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800',
      date: '15 окт 2024',
      comments: []
    },
    {
      id: 2,
      title: 'Анимации в вебе',
      excerpt: 'Как создавать плавные анимации, которые не замедляют сайт',
      category: 'Разработка',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
      date: '12 окт 2024',
      comments: []
    },
    {
      id: 3,
      title: 'Типографика 2024',
      excerpt: 'Новые подходы к работе со шрифтами в цифровых продуктах',
      category: 'Дизайн',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800',
      date: '10 окт 2024',
      comments: []
    }
  ];

  const [articlesState, setArticlesState] = useState(articles);

  const handleAddComment = (articleId: number) => {
    if (!commentAuthor.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: commentAuthor,
      text: commentText,
      date: new Date().toLocaleDateString('ru-RU')
    };

    setArticlesState(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, comments: [...article.comments, newComment] }
        : article
    ));

    if (selectedArticle) {
      setSelectedArticle({
        ...selectedArticle,
        comments: [...selectedArticle.comments, newComment]
      });
    }

    setCommentAuthor('');
    setCommentText('');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Спасибо за подписку! Мы отправим письмо на ${email}`);
    setEmail('');
  };

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MODERN BLOG
              </h1>
              <Button variant="ghost" onClick={() => setSelectedArticle(null)}>
                <Icon name="ArrowLeft" size={20} />
                <span className="ml-2">Назад</span>
              </Button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-12">
          <article className="max-w-4xl mx-auto animate-fade-in">
            <Badge className="mb-4 bg-secondary">{selectedArticle.category}</Badge>
            <h1 className="text-5xl font-bold mb-4">{selectedArticle.title}</h1>
            <p className="text-muted-foreground mb-6">{selectedArticle.date}</p>
            
            <img 
              src={selectedArticle.image} 
              alt={selectedArticle.title}
              className="w-full h-[400px] object-cover rounded-lg mb-8 shadow-lg"
            />

            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg leading-relaxed">
                {selectedArticle.excerpt}
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            <div className="border-t pt-8">
              <h2 className="text-3xl font-bold mb-6">
                Комментарии ({selectedArticle.comments.length})
              </h2>

              <div className="space-y-4 mb-8">
                {selectedArticle.comments.map((comment) => (
                  <Card key={comment.id} className="hover-scale">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{comment.author}</CardTitle>
                        <span className="text-sm text-muted-foreground">{comment.date}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>{comment.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle>Оставить комментарий</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Ваше имя"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                  />
                  <Textarea
                    placeholder="Ваш комментарий"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={4}
                  />
                  <Button 
                    onClick={() => handleAddComment(selectedArticle.id)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Отправить
                  </Button>
                </CardContent>
              </Card>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MODERN BLOG
            </h1>
            <div className="flex gap-6">
              <a href="#home" className="story-link font-medium hover:text-primary transition-colors">
                Главная
              </a>
              <a href="#articles" className="story-link font-medium hover:text-primary transition-colors">
                Статьи
              </a>
              <a href="#categories" className="story-link font-medium hover:text-primary transition-colors">
                Категории
              </a>
              <a href="#subscribe" className="story-link font-medium hover:text-primary transition-colors">
                Подписка
              </a>
              <a href="#contact" className="story-link font-medium hover:text-primary transition-colors">
                Контакты
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="container mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Добро пожаловать в наш блог
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Исследуем мир дизайна, разработки и креативных технологий
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 hover-scale">
                <Icon name="BookOpen" size={20} />
                <span className="ml-2">Читать статьи</span>
              </Button>
              <Button size="lg" variant="outline" className="hover-scale">
                <Icon name="Mail" size={20} />
                <span className="ml-2">Подписаться</span>
              </Button>
            </div>
          </div>
        </section>

        <section id="categories" className="container mx-auto px-4 py-12">
          <div className="flex gap-3 justify-center flex-wrap">
            <Badge className="bg-primary text-lg px-6 py-2 hover-scale cursor-pointer">
              <Icon name="Palette" size={16} />
              <span className="ml-2">Дизайн</span>
            </Badge>
            <Badge className="bg-secondary text-lg px-6 py-2 hover-scale cursor-pointer">
              <Icon name="Code2" size={16} />
              <span className="ml-2">Разработка</span>
            </Badge>
            <Badge className="bg-accent text-accent-foreground text-lg px-6 py-2 hover-scale cursor-pointer">
              <Icon name="Sparkles" size={16} />
              <span className="ml-2">Тренды</span>
            </Badge>
          </div>
        </section>

        <section id="articles" className="container mx-auto px-4 py-12">
          <h3 className="text-4xl font-bold mb-12 text-center">Избранные статьи</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articlesState.map((article, index) => (
              <Card 
                key={article.id} 
                className="hover-scale cursor-pointer overflow-hidden group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedArticle(article)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <Badge className="absolute top-4 left-4 bg-secondary">
                    {article.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription>{article.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="MessageSquare" size={16} />
                      {article.comments.length}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Eye" size={16} />
                      234
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="subscribe" className="container mx-auto px-4 py-20">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 border-2 animate-scale-in">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Подписка на рассылку</CardTitle>
              <CardDescription className="text-lg">
                Получайте новые статьи первыми
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubscribe} className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Подписаться
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        <section id="contact" className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-6">Свяжитесь с нами</h3>
            <p className="text-lg text-muted-foreground mb-8">
              Есть вопросы или предложения? Мы всегда рады обратной связи!
            </p>
            <div className="flex gap-6 justify-center">
              <Button variant="outline" size="lg" className="hover-scale">
                <Icon name="Mail" size={20} />
                <span className="ml-2">Email</span>
              </Button>
              <Button variant="outline" size="lg" className="hover-scale">
                <Icon name="MessageCircle" size={20} />
                <span className="ml-2">Telegram</span>
              </Button>
              <Button variant="outline" size="lg" className="hover-scale">
                <Icon name="Send" size={20} />
                <span className="ml-2">Twitter</span>
              </Button>
            </div>
          </div>
        </section>

        <footer className="border-t mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-muted-foreground">
              <p>© 2024 Modern Blog. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </div>
    );
};

export default Index;