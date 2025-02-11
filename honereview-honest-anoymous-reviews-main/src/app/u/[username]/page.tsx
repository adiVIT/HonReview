"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { useCompletion } from "ai/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";

const specialChar = "||";

const parseStringMessages = (messageString: string): string[] => {
  return messageString.split(specialChar);
};

const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

const categorySpecificFields = {
  healthcare: ["expenses", "treatment", "nurses", "environment"],
  finance: ["customerService", "interestRates", "fees", "accessibility"],
  education: ["teachingQuality", "facilities", "extracurricular", "supportServices"],
  lifestyle: ["amenities", "location", "community", "valueForMoney"],
};

type Category = keyof typeof categorySpecificFields;

const renderCategorySpecificFields = (category: Category, form: any) => {
  const fields = categorySpecificFields[category] || [];
  return fields.map((field) => (
    <FormField
      key={field}
      control={form.control}
      name={`categorySpecificRatings.${category}.${field}`}
      render={({ field: formField }) => (
        <FormItem>
          <FormLabel>{field}</FormLabel>
          <FormControl>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`cursor-pointer ${
                    star <= formField.value
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => formField.onChange(star)}
                />
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ));
};

export default function SendMessage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const [userData, setUserData] = useState<any>(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `/api/getuserdata?username=${username}`
        );
        console.log(`/api/getuserdata?username=${username}`);

        console.log("User data:", response.data.userData);
        setUserData(response.data.userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoadingUserData(false);
      }
    };

    fetchUserData();
  }, [username]);

  const {
    complete,
    completion,
    input,
    handleInputChange,
    handleSubmit: handleSuggestSubmit,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: "/api/suggest-messages",
    initialCompletion: initialMessageString,
  });

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  const messageContent = form.watch("content");
  const starRating = form.watch("starRating");

  const handleStarClick = (rating: number) => {
    form.setValue("starRating", rating, { shouldValidate: true });
  };

  const handleMessageClick = (message: string) => {
    form.setValue("content", message, { shouldValidate: true });
    handleInputChange({
      target: { value: message },
    } as React.ChangeEvent<HTMLTextAreaElement>);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        username,
      });

      toast({
        title: response.data.message,
        variant: "default",
      });
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to sent message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container mx-auto my-8 p-6 bg-white rounded max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center">FEEDBACK</h1>
      {isLoadingUserData ? (
        <div className="flex justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading user data...
        </div>
      ) : (
        userData && (
          <div className="mb-6 p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-2 border-b pb-2">
              Product Name:{" "}
              <span className="text-blue-600">{userData.productname}</span>
            </h2>
            <p className="text-lg mb-4">
              Product Details:{" "}
              <span className="text-gray-700">{userData.productdetails}</span>
            </p>
            <div className="text-lg">
              Product Category:
              <span className="bg-blue-100 text-blue-800 text-sm font-medium ml-2 px-2.5 py-0.5 rounded-full">
                {userData.productcategories}
              </span>
            </div>
          </div>
        )
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Send anonymous review to @{username}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your anonymous review here"
                    className="resize-none"
                    {...field}
                    value={input}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="starRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Star Rating</FormLabel>
                <FormControl>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`cursor-pointer ${
                          star <= starRating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                        onClick={() => handleStarClick(star)}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {userData &&
            renderCategorySpecificFields(userData.productcategories, form)}
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isLoading || !messageContent || !starRating}
              >
                Send It
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 my-8">
        <div className="space-y-2">
          <form onSubmit={handleSuggestSubmit}>
            <Button type="submit" disabled={isSuggestLoading}>
              Construct reviews
            </Button>
          </form>
          {isSuggestLoading && (
            <div className="flex justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading suggestions...
            </div>
          )}
          <p>Click on any review below to select it.</p>
        </div>
        <Card>
          <CardHeader>
            <h3 className="text-xl font-semibold">SUGGESTIONS</h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              parseStringMessages(completion)
                .slice(1, -1)
                .map((message, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="mb-2 break-words p-4"
                    onClick={() => handleMessageClick(message)}
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "normal",
                      height: "auto",
                    }}
                  >
                    <span className="block text-ellipsis overflow-hidden max-w-full text-left">
                      {message}
                    </span>
                  </Button>
                ))
            )}
          </CardContent>
        </Card>
      </div>
      <Separator className="my-6" />
      <div className="text-center">
        <div className="mb-4">Get Your Review Board</div>
        <Link href={"/sign-up"}>
          <Button>Create Your Account</Button>
        </Link>
      </div>
    </div>
  );
}
