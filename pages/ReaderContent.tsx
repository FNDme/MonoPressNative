import { Dimensions, ScrollView, Image, View, Linking, TouchableOpacity } from 'react-native';
import { Card, CardTitle, CardHeader, CardContent } from '~/components/ui/card';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState, useMemo } from 'react';
import { useRss } from '~/context/rss-context';
import { Post } from '~/types/feed';
import { parseArticle } from '~/utils/articleParseRN';
import RenderHtml, { HTMLElementModel, HTMLContentModel } from 'react-native-render-html';
import { Text } from '~/components/ui/text';
import { Separator } from '~/components/ui/separator';
import { Calendar } from '~/lib/icons/Calendar';
import { ExternalLink } from '~/lib/icons/ExternalLink';
import { Globe } from '~/lib/icons/Globe';
import { User } from '~/lib/icons/User';
import { AlertCircle } from '~/lib/icons/AlertCircle';
import { Skeleton } from '~/components/ui/skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Article {
  title: string;
  content: string;
  url: string;
  image: string;
}

const defaultTextProps = {
  selectable: true,
};

const customRenderers = {
  div: (props: any) => {
    const { tnode, TNodeChildrenRenderer } = props;
    return (
      <View className="flex-1">
        <TNodeChildrenRenderer tnode={tnode} />
      </View>
    );
  },
  p: (props: any) => {
    const { tnode, TNodeChildrenRenderer } = props;
    return (
      <Text {...defaultTextProps} className="mb-4 text-xl leading-8 text-foreground">
        <TNodeChildrenRenderer tnode={tnode} />
      </Text>
    );
  },
  h1: (props: any) => {
    const { tnode, TNodeChildrenRenderer } = props;
    return (
      <Text {...defaultTextProps} className="mb-4 text-2xl font-bold text-foreground">
        <TNodeChildrenRenderer tnode={tnode} />
      </Text>
    );
  },
  h2: (props: any) => {
    const { tnode, TNodeChildrenRenderer } = props;
    return (
      <Text {...defaultTextProps} className="mb-3.5 text-xl font-bold text-foreground">
        <TNodeChildrenRenderer tnode={tnode} />
      </Text>
    );
  },
  h3: (props: any) => {
    const { tnode, TNodeChildrenRenderer } = props;
    return (
      <Text {...defaultTextProps} className="mb-3 text-lg font-bold text-foreground">
        <TNodeChildrenRenderer tnode={tnode} />
      </Text>
    );
  },
  a: (props: any) => {
    const { tnode, TNodeChildrenRenderer } = props;
    const href = tnode.attributes?.href;
    return (
      <Text
        {...defaultTextProps}
        className="text-xl text-sky-500 underline"
        onPress={() => href && Linking.openURL(href)}>
        <TNodeChildrenRenderer tnode={tnode} />
      </Text>
    );
  },
  strong: (props: any) => {
    const { tnode, TNodeChildrenRenderer } = props;
    return (
      <Text {...defaultTextProps} className="text-xl font-bold text-foreground">
        <TNodeChildrenRenderer tnode={tnode} />
      </Text>
    );
  },
  em: (props: any) => {
    const { tnode, TNodeChildrenRenderer } = props;
    return (
      <Text {...defaultTextProps} className="text-xl italic text-foreground">
        <TNodeChildrenRenderer tnode={tnode} />
      </Text>
    );
  },
  section: (props: any) => {
    const { tnode, TNodeChildrenRenderer } = props;
    return (
      <View className="mt-6">
        <TNodeChildrenRenderer tnode={tnode} />
      </View>
    );
  },
  ul: (props: any) => {
    const { tnode, TNodeChildrenRenderer } = props;
    return (
      <View className="mb-4">
        <TNodeChildrenRenderer tnode={tnode} />
      </View>
    );
  },
  li: (props: any) => {
    const { tnode, TNodeChildrenRenderer } = props;
    return (
      <Text {...defaultTextProps} className="mb-2 text-xl text-foreground">
        <TNodeChildrenRenderer tnode={tnode} />
      </Text>
    );
  },
  text: (props: any) => {
    const { tnode } = props;
    return (
      <Text {...defaultTextProps} className="text-xl">
        {tnode.data}
      </Text>
    );
  },
  iframe: (props: any) => {
    const { tnode } = props;
    const src = tnode.attributes?.src;
    if (!src) return null;

    return (
      <TouchableOpacity
        className="my-4 rounded-lg bg-muted p-4"
        onPress={() => Linking.openURL(src)}>
        <View className="flex-row items-center justify-center gap-2">
          <ExternalLink size={16} className="text-muted-foreground" />
          <Text className="text-sm text-muted-foreground">Open embedded content</Text>
        </View>
      </TouchableOpacity>
    );
  },
  img: (props: any) => {
    const { tnode } = props;
    const src = tnode.attributes?.src;
    if (!src) return null;

    return (
      <Image
        source={{ uri: src }}
        height={tnode.attributes?.height > 200 ? 200 : tnode.attributes?.height}
        className="w-full rounded-lg"
      />
    );
  },
};

const customHTMLElementModels = {
  source: HTMLElementModel.fromCustomModel({
    tagName: 'source',
    contentModel: HTMLContentModel.block,
  }),
  iframe: HTMLElementModel.fromCustomModel({
    tagName: 'iframe',
    contentModel: HTMLContentModel.block,
    isVoid: true,
  }),
  svg: HTMLElementModel.fromCustomModel({
    tagName: 'svg',
    contentModel: HTMLContentModel.block,
  }),
};

const SkeletonLoader = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="mb-6 h-[200px] w-full" />
        <Skeleton className="h-8 w-3/4" />
      </CardHeader>
      <CardContent>
        <View className="mb-4 flex flex-col gap-2 rounded-lg p-4">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
        </View>
        <View className="flex flex-col gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </View>
      </CardContent>
    </Card>
  );
};

const ErrorState = ({ message }: { message: string }) => {
  return (
    <Card>
      <CardContent className="flex items-center justify-center py-12">
        <AlertCircle size={48} className="mb-4 text-red-500" />
        <Text className="text-center text-lg font-semibold text-red-500">
          Error Loading Article
        </Text>
        <Text className="mt-2 text-center text-zinc-500">{message}</Text>
      </CardContent>
    </Card>
  );
};

export const ReaderContent = () => {
  const route = useRoute();
  const { url } = route.params as { url: string };
  const { posts } = useRss();
  const [post, setPost] = useState<Post | null>(null);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const contentWidth = useMemo(() => {
    const screenWidth = Dimensions.get('screen').width;
    // Account for card padding (p-4 = 16px) and screen padding (p-4 = 16px)
    return screenWidth - 64;
  }, []);

  useEffect(() => {
    const getPostFromUrl = async () => {
      const post = posts.find((post) => post.link === url);
      if (post) {
        setPost(post);
      }
    };
    getPostFromUrl();
  }, [posts, url]);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!url) return;

      try {
        setLoading(true);
        setError(null);

        // Decode the URL parameter
        const decodedUrl = decodeURIComponent(url);

        // Fetch and parse the article using our server endpoint
        const response = await parseArticle(decodedUrl);

        // Only set article if we have at least some content
        if (response.content) {
          setArticle(response);
        } else {
          throw new Error('No content found in the article');
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        setError(error instanceof Error ? error.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [url]);

  const renderHtmlContent = useMemo(() => {
    if (!article?.content) return null;

    return (
      <View className="flex-1">
        <RenderHtml
          source={{ html: article.content }}
          contentWidth={contentWidth}
          renderers={customRenderers}
          enableExperimentalBRCollapsing
          enableExperimentalGhostLinesPrevention
          defaultTextProps={defaultTextProps}
          ignoredStyles={['fontFamily', 'fontSize', 'lineHeight']}
          ignoredDomTags={['script', 'style', 'svg']}
          customHTMLElementModels={customHTMLElementModels}
        />
      </View>
    );
  }, [article?.content, contentWidth]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="p-4">
          {loading ? (
            <SkeletonLoader />
          ) : error ? (
            <ErrorState message={error} />
          ) : (
            <Card>
              <CardHeader>
                {!!article?.image && (
                  <Image
                    source={{ uri: article?.image }}
                    className="mb-6 h-[200px] w-full rounded-lg"
                    resizeMode="cover"
                  />
                )}
                <View className="mb-4 flex flex-col items-start justify-start gap-3 rounded-lg bg-muted p-4 text-muted-foreground">
                  <TouchableOpacity
                    className="flex flex-row items-center gap-2 text-sm text-muted-foreground"
                    onPress={() => Linking.openURL(article?.url || '')}>
                    <ExternalLink size={16} className="text-muted-foreground" />
                    <Text className="text-sm text-muted-foreground">Read original article</Text>
                  </TouchableOpacity>
                  <Separator className="bg-muted-foreground opacity-30" />
                  {post?.date && (
                    <View className="flex flex-row items-center gap-2">
                      <Calendar size={16} className="text-muted-foreground" />
                      <Text className="text-sm text-muted-foreground">
                        {new Date(post.date).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })}
                      </Text>
                    </View>
                  )}
                  {post?.author && (
                    <View className="flex flex-row items-center gap-2">
                      <User size={16} className="text-muted-foreground" />
                      <Text className="text-sm text-muted-foreground">{post.author}</Text>
                    </View>
                  )}
                  {post?.source && (
                    <View className="flex flex-row items-center gap-2">
                      <Globe size={16} className="text-muted-foreground" />
                      <Text className="text-sm text-muted-foreground">
                        {post.source.sourceName || post.source.title || 'Unknown Source'}
                      </Text>
                    </View>
                  )}
                </View>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-6">{article?.title || 'Untitled Article'}</CardTitle>
                {renderHtmlContent}
              </CardContent>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
