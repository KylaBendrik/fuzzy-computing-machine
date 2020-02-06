def start_wizard
  prompt = "> "
  puts "Hi! welcome to Text File Creator 2000"
  puts prompt + "To get started, give a name to your file (without extension)"
  file_name = $stdin.gets.chomp

  puts prompt + "Awesome! Now provide the content of the file!"
  content = $stdin.gets.chomp
  puts """
  Alright, so your filename will be #{file_name}
  and the content will be #{content}. Do you want to continue (Yes[y]/No[n])?
  """

  #confirm the creation of the file
  response = $stdin.gets.chomp.downcase

  case response
    #if confirm, create the file
  when 'y', 'j', 'yes'
    out_file = File.new("#{filename}.txt", 'w')
    out_file.puts(content)
    out_file.close

    puts "Your file has been succesfully created, come back soon!"
  #if not, ask if user wants to continue or just exit
  when 'no', 'n'
    puts prompt + "Oh bother, do you want to start again (Yes[y]/No[n])?"
    response = $stdin.gets.chomp

    case response
    when 'y', 'j', 'yes'
      start_wizard()
    when 'n', 'no'
      exit
    end
  end
end

# start execution

begin
  start_wizard()
#write a log in case of error
rescue Exception => e
  File.open("except.log") do |f|
    f.puts e.inspect
    f.puts e.backtrace
  end
end