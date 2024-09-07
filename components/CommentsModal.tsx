import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  TextInput,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ReactNativeModal from "react-native-modal";
import { useState, useRef, useCallback, useEffect } from "react";
import { CommentComponent } from "./CommentComponent";
import { Comment, Post } from "@/constants/Types";
import { CommentPost } from "./CommentPost";

// Define the props for the CommentsModal component
type CommentsModalProps = {
  isCommentModalOpen: boolean;
  toggleCommentModal: (post: Post | null) => void;
  post: Post | null;
};

export default function CommentsModal({
  isCommentModalOpen,
  toggleCommentModal,
  post,
}: CommentsModalProps) {
  const colorScheme = useColorScheme();
  const [comments, setComments] = useState<Comment[]>(post?.commentList ?? []);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const flatListRef = useRef<FlatList<Comment>>(null);
  // State to store the reply text
  const [replyText, setReplyText] = useState("");
  

  if (!post) {
    toggleCommentModal(null);
    return null;
  }

  // Effect to prefetch the story image when a story is opened
  useEffect(() => {
    if (post) {
      Image.prefetch(post.image)
        .then(() => setImageLoaded(true))
        .catch((error) => console.error("Error prefetching image:", error));
    }
    return () => {
      setImageLoaded(false);
    };
  }, [post]);

  // Animation value for fading in the image
  const fadeAnim = useState(new Animated.Value(0))[0];

  const onImageLoad = () => {
    setImageLoaded(true);
    // Start fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handlePostComment = useCallback(() => {
    if (newCommentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        user: {
          name: "Jack Miller",
          avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        },
        comment: newCommentText.trim(),
        timestamp: Date.now().toString(),
      };
      setComments((prevComments) => [newComment, ...prevComments]);
      setNewCommentText("");
      Keyboard.dismiss();
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
      // Here you would typically make an API call to post the comment
    }
  }, [newCommentText]);

  const HeaderItem = ({ post }: { post: Post }) => {
    return (
      <View>
        {imageLoaded ? (
          <CommentPost post={post} onImageLoad={onImageLoad} />
        ) : (
          // Loading indicator while the image is being loaded
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator
              size="large"
              color={Colors[colorScheme ?? "light"].text}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <ReactNativeModal
        isVisible={isCommentModalOpen}
        animationIn="lightSpeedIn"
        animationOut="lightSpeedOut"
        animationInTiming={0}
        animationOutTiming={0}
        onBackdropPress={() => toggleCommentModal(null)}
        onBackButtonPress={() => toggleCommentModal(null)}
        style={{
          backgroundColor: Colors[colorScheme ?? "light"].background,
          flex: 1,
          margin: 0,
          padding: 0,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: Colors[colorScheme ?? "light"].background,
          }}
        >
          <View
            className="flex flex-row items-center justify-start h-14 w-full border-b border-slate-600/20 px-4"
            style={{
              backgroundColor: Colors[colorScheme ?? "light"].background,
            }}
          >
            <TouchableOpacity onPress={() => toggleCommentModal(null)}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={Colors[colorScheme ?? "light"].text}
              />
            </TouchableOpacity>
            <Text
              className="text-lg font-extrabold pr-6 flex-1 text-center"
              style={{ color: Colors[colorScheme ?? "light"].text }}
            >
              {post?.name}'s post
            </Text>
          </View>
          <View className="flex-1">
            <FlatList
              data={comments}
              renderItem={({ item }) => <CommentComponent item={item} />}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={<HeaderItem post={post} />}
              ListEmptyComponent={() => (
                <View className="flex-1 justify-center items-center">
                  <Text className="text-lg font-extrabold text-center">
                    No comments yet
                  </Text>
                </View>
              )}
              ListFooterComponent={() => (
                <View>
                  {comments.length !== 0 && (
                    <View className=" justify-center py-4 items-center"></View>
                  )}
                </View>
              )}
              ref={flatListRef}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: Colors[colorScheme ?? "light"].background,
              minHeight: 70,
            }}
            className=" items-center flex flex-row px-3 border-t border-slate-600/30"
          >
            <TextInput
              style={{
                flex: 1,
                borderColor: Colors[colorScheme ?? "light"].text,
                borderWidth: 1,
                borderRadius: 20,
                padding: 8,
                color: Colors[colorScheme ?? "light"].text,
              }}
              className="bg-slate-500/30"
              placeholder={`Reply to ${post.name}'s post...`}
              placeholderTextColor={Colors[colorScheme ?? "light"].text}
              value={replyText}
              onChangeText={setReplyText}
            />
            {/* Send button for the reply */}
            <TouchableOpacity
              style={{ marginLeft: 10, justifyContent: "center" }}
              onPress={() => {
                console.log("Reply sent:", replyText);
                setReplyText("");
              }}
            >
              <Ionicons
                name="send"
                size={24}
                color={Colors[colorScheme ?? "light"].text}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
}
