import drawBot as db

newPage(1000, 300)


content = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ"]
content.append(content[0].lower())
content.append('0123456789?!')
content = "\n".join(content)

path = db.BezierPath()
path.text(content, (width()/2, 0), align="center")
left, bottom, right, top = path.bounds()

w = right - left
h = top - bottom

ratio = height()/h
path.translate(0, -bottom)
path.scale(ratio, ratio, center=(width()/2, 0))

drawPath(path)