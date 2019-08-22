import json;
import pandas as pd;

abbrevs = ['US','AL','AK','AZ','AR','CA','CO','CT','DE',\
           'DC','FL','GA','HI','ID','IL','IN','IA','KS',\
           'KY','LA','ME','MD','MA','MI','MN','MS','MO',\
           'MT','NE','NV','NH','NJ','NM','NY','NC','ND',\
           'OH','OK','OR','PA','PR','RI','SC','SD','TN','TX',\
           'UT','VT','VA','WA','WV','WI','WY']

file = './res/avg_teacher_salaries.csv'
df_data = pd.read_csv(file)
df_data['States'] = abbrevs
df_data = df_data.transpose()
df_data.columns = df_data.iloc[0]
df_data = df_data.drop(['States','Unnamed: 29'])
df_data.columns.rename('Year',inplace=True)
del df_data['PR']
for column in df_data.columns:
    df_data[column].replace(regex=True,inplace=True,to_replace=r'[^0-9]+',value=r'')
    df_data[column] = df_data[column].astype(int)
df_data.dropna()
df_data.to_csv('./teacher_salary_clean.csv')

df_keys = pd.read_csv(file)
df_keys['Abbrevs'] = abbrevs
df_keys = df_keys[['States','Abbrevs']]
df_keys = df_keys.set_index('States')
df_keys.rename(columns={"Abbrevs":"Keys"}, inplace = True)
df_keys.to_json('../js/state_keys.json')