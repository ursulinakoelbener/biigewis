import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.cm as cm
import numpy as np

# CSV einlesen
df = pd.read_csv("data/standeskommission.csv", sep=";")

# Personen-ID erzeugen
df["Person"] = df["Vorname"] + " " + df["Nachname"]

# Funktionen als Kategorien (für y-Achse)
funktionen = list(df["Funktion"].unique())
df["Funktion_idx"] = df["Funktion"].apply(lambda x: funktionen.index(x))

# Farben je Person
personen = df["Person"].unique()
farben = cm.get_cmap("tab20", len(personen))
person_to_color = {person: farben(i) for i, person in enumerate(personen)}

# Plot
fig, ax = plt.subplots(figsize=(12, 6))
for _, row in df.iterrows():
    ax.scatter(
        row["Jahr"],
        row["Funktion_idx"],
        color=person_to_color[row["Person"]],
        label=row["Person"],
        s=80,
        edgecolor="k",
        alpha=0.9,
    )

# Y-Achse beschriften
ax.set_yticks(np.arange(len(funktionen)))
ax.set_yticklabels(funktionen)
ax.set_xlabel("Jahr")
ax.set_ylabel("Funktion")
ax.set_title("Standeskommission: Punkte je Person eingefärbt")

# Legende (einmal pro Person)
handles = []
labels = []
for person in personen:
    handles.append(plt.Line2D([0], [0], marker='o', color='w',
                              markerfacecolor=person_to_color[person], markersize=8, markeredgecolor='k'))
    labels.append(person)
ax.legend(handles, labels, bbox_to_anchor=(1.05, 1), loc='upper left', title="Person", fontsize=8)

plt.tight_layout()
plt.savefig("standeskommission_personen.svg", format="svg")
plt.show()