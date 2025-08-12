---
layout: post
title: AI Glossary
---

A collection of various AI-related terms and notions. Obtained from many different sources on the Internet.

## Glossary (unsorted)

* `LLM` - Large Language Model
* `Tokenization` - breaking down the input text, or "prompt", into smaller pieces known as tokens.
* `Embedding` - each token is converted into a numerical representation.
* `Positional Encoding` - The encoder processes the input sequence into a context-dependent representation that captures the meaning of the text.
* `Encoder` - the encoder processes each token in the input-sequence transforming it into a vector of fixed length i.e. the "context vector".
* `Attention Mechanism` (or `Self-attention`) - Self attention mechanism allows the model to create context-aware representations of each word.
* `Decoding` - LLM Decoder will take the prior word sequence and contextual representation and use it to predict the next token in the sequence.
* `Parameter` - a value that the model learns during training.
* `Backpropagation` - a process used to adjust the parameters of a model during training. It involves calculating the error between the model's predictions and the actual output and adjusting the parameters to minimize this error.
* `Fine-tuning` - a process which involves taking a pre-trained language model and providing additional training using task-specific data sets moderated by humans. This process typically requires fewer data than training a model from scratch and can be done relatively quickly.
* `RLHF` - "Reinforcement Learning From Human Feedback. This approach involves incorporating human feedback into machine learning models to improve their accuracy and performance.
* `Inference` - a process of using a trained machine learning model to make predictions or decisions based on new input data.
* `Vector` - in the context of natural language processing, a vector is a list of numbers used to represent a word or phrase in a way that captures its relationship to other words or phrases within a model. A key useful feature of these vectors is that similar things cluster together.
* `Beam search` - is a search algorithm used to generate output sequences from a model during inference. It works by maintaining a set of the `top-k` most likely sequences at each step of the generation process, where k is known as the Beam width.
* `Frequency` - is a parameter used in language models to control how often a token can be repeated in the generated output.
* `Temperature` - is a technique used in language models to control the level of randomness and creativity in the generated output during inference.
* `Sampling` - is another algorithm used to generate output sequences from a model during inference. Unlike Beam search, which generates only the top-k most likely sequences at each step, sampling generates output tokens probabilistically based on the model's predicted probability distribution over all possible tokens at that step.
* `Top-k sampling ` - is a method used in language generation where, instead of considering all possible next words in the vocabulary, the model only considers the top 'k' most probable next words.
* `BERT` - Bidirectional Encoder Representations from Transformers, is a powerful language model developed by Google.
* `ROUGE` - "Recall-Oriented Understudy for Gisting Evaluation" is a set of metrics used to evaluate the quality of automatically generated text, particularly in tasks like text summarization and machine translation.
* `ROUGE-1` - n=1, unigram (single word)
* `ROUGE-2` - n=2, bigram (word pairs)
* `ROUGE-L` - measures overlap based on longest common subsequence (LCS) between generated and reference summaries
* `Precision` - is a metric that measures how many of the positive predictions made by a model are actually correct.
* `Recall` - is a metric that measures how well a model identifies all relevant instances within a dataset.
* `F-Score` (or `F1-score`) - is a metric used in machine learning to evaluate the performance of a binary classification model. Formula: `F-score = 2 * (precision * recall) / (precision + recall)`.
* `BERTScore` - is an automated metric for evaluating text generation tasks, particularly machine translation and text summarization.
* `BLEU` - "Bilingual Evaluation Understudy" is a metric used to evaluate the quality of machine-translated text by comparing it to reference translations.
* `Tensor` - is a multidimensional array of numbers, used as the basic data structure in neural networks to represent inputs, outputs, weights, etc.
* `Loss` - is a measure used during training to quantify how far a model's outputs are from the desired output. It guides the updating of the model's parameters.
* `VAE` - "Variational Autoencoder" is a type of deep learning model used in machine learning for generating new data samples that resemble a given dataset.
* `Diffusion Model` - is a type of generative model that creates images by gradually reversing a process of adding noise to an image, ultimately revealing a coherent image.
* `LORA` - "Low-Rank Adaptation" is a method for fine-tuning large models by altering only a small subset of their parameters, allowing for effective model improvements or adaptations with minimal changes. 	
* `Stable Diffusion` - is a suite of latent diffusion models known for efficient and high-quality image generation.
* `FAISS` - "Facebook AI Similarity Search" is an open-source library developed by Meta AI for efficient similarity search and clustering of dense vectors.
* `llama.cpp` - is an open-source C/C++ project designed to enable the efficient inference of large language models (LLMs) on consumer hardware, particularly focusing on CPU-based execution.
* `Embeddings` - are numerical representations of data that allow machine learning models to understand relationships between different objects, like words, images, or even user interactions. (somewhat related to `Embedding` above I suppose)
* `RAG` - "Retrieval-Augmented Generation" is a technique that combines the strengths of information retrieval systems with large language models (LLMs).
