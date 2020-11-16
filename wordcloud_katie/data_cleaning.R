library(httr)
library(readxl)
library(lubridate)
library(gridExtra) #viewing multiple plots together
library(tidytext) #Text mining
library(textdata)
library(tidyr) #Spread, separate, unite, text mining (also included in the tidyverse package)
library(widyr) #Use for pairwise correlation
library(wordcloud2) #creative visualizations
library(scales)
library(billboard)
library(mgcv)
library(MASS)
library(olsrr)
library(gt)
library(broom)
library(sjPlot)
library(sjmisc)
library(sjlabelled)
library(tidyverse)

x <- read.csv("data/winemag-data-130k-v2.csv")

fix.contractions <- function(doc) {
  # "won't" is a special case as it does not expand to "wo not"
  doc <- gsub("won't", "will not", doc)
  doc <- gsub("can't", "can not", doc)
  doc <- gsub("n't", " not", doc)
  doc <- gsub("'ll", " will", doc)
  doc <- gsub("'re", " are", doc)
  doc <- gsub("'ve", " have", doc)
  doc <- gsub("'m", " am", doc)
  doc <- gsub("'d", " would", doc)
  # 's could be 'is' or could be possessive: it has no expansion
  doc <- gsub("'s", "", doc)
  return(doc)
}

# fix (expand) contractions
x$description <- sapply(x$description, fix.contractions)

# function to remove special characters
removeSpecialChars <- function(x) gsub("[^a-zA-Z0-9 ]", " ", x)

# remove special characters
x$description <- sapply(x$description, removeSpecialChars)

#make lower case
x$description <- sapply(x$description, tolower)

#unnest and remove stop, undesirable words
x_filtered <- x %>%
  unnest_tokens(word, description) %>%
  anti_join(stop_words) %>%
  distinct() %>%
  filter(nchar(word) > 3)

write.csv(x_filtered, 'winemag_words.csv')

