import subprocess

def claude_code(prompt):
    result = subprocess.run(
        ['claude', '--prompt', prompt],
        capture_output=True,
        text=True
    )
    return result.stdout

# Farklı örnekler
response1 = claude_code("HTML'de bir login formu oluştur")
print(response1)

response2 = claude_code("Python'da dosya okuma yazma örneği")
print(response2)

response3 = claude_code("JavaScript'te API çağrısı nasıl yapılır")
print(response3)
