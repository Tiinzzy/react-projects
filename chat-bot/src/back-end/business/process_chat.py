from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-medium")
model = AutoModelForCausalLM.from_pretrained("microsoft/DialoGPT-medium")
class GLOBALS:
    step = 0
    chat_history_ids = None

def reply(question):
    new_user_input_ids = tokenizer.encode(question + tokenizer.eos_token, return_tensors='pt')
    bot_input_ids = torch.cat([GLOBALS.chat_history_ids, new_user_input_ids], dim=-1) if GLOBALS.step > 0 else new_user_input_ids
    GLOBALS.chat_history_ids = model.generate(bot_input_ids, max_length=1000, pad_token_id=tokenizer.eos_token_id)
    print("DialoGPT: {}".format(tokenizer.decode(GLOBALS.chat_history_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True)))
    GLOBALS.step += 1
    return format(tokenizer.decode(GLOBALS.chat_history_ids[:, bot_input_ids.shape[-1]:][0], skip_special_tokens=True))

