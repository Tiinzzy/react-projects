from transformers import AutoModelForCausalLM, AutoTokenizer

chatbot_name = "microsoft/DialoGPT-medium"
tokenizer = AutoTokenizer.from_pretrained(chatbot_name)
tokenizer.add_special_tokens({'pad_token': tokenizer.eos_token})
model = AutoModelForCausalLM.from_pretrained(chatbot_name)


def reply(input_text):
    print(tokenizer.eos_token)
    bot_input_ids = tokenizer.encode(input_text + tokenizer.eos_token, return_tensors='pt', padding=False)
    chatbot_output = model.generate(bot_input_ids, max_length=1000, num_return_sequences=1, pad_token_id=50256)
    chatbot_response = tokenizer.decode(chatbot_output[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)
    return chatbot_response
